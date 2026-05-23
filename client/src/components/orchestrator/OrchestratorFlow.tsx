import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ClassificationResult,
  BusinessUnitResult,
  AgentDeployment,
  ResearchFinding,
  TripleImpactScore,
  BusinessUnit
} from '@/services/OrchestratorService';
import { CheckCircle2, Zap, Brain, TrendingUp, BookOpen } from 'lucide-react';

interface OrchestratorFlowProps {
  classification: ClassificationResult;
  businessUnitResults: BusinessUnitResult[];
  agents: AgentDeployment[];
  research: ResearchFinding[];
  impact: TripleImpactScore;
  executionTime: number;
}

const businessUnitIcons: Record<BusinessUnit, React.ReactNode> = {
  INDUSTRIAL: <Zap className="w-5 h-5" />,
  ENERGY: <TrendingUp className="w-5 h-5" />,
  AGENTS: <Brain className="w-5 h-5" />,
  DIGITAL_TWIN: <TrendingUp className="w-5 h-5" />,
  LABS: <BookOpen className="w-5 h-5" />
};

const businessUnitColors: Record<BusinessUnit, string> = {
  INDUSTRIAL: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  ENERGY: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  AGENTS: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  DIGITAL_TWIN: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  LABS: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30'
};

export function OrchestratorFlow({
  classification,
  businessUnitResults,
  agents,
  research,
  impact,
  executionTime
}: OrchestratorFlowProps) {
  return (
    <div className="w-full space-y-8">
      {/* Classification Summary */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
            <p className="text-gray-400">Industry: <span className="text-cyan-400 capitalize">{classification.industry}</span></p>
            <p className="text-gray-400">Confidence: <span className="text-green-400">{(classification.confidence * 100).toFixed(1)}%</span></p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cyan-400">{classification.recommendedUnits.length}</div>
            <p className="text-sm text-gray-400">Units Activated</p>
          </div>
        </div>
        {classification.detectedProblems.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-300">Detected Issues:</p>
            <div className="flex flex-wrap gap-2">
              {classification.detectedProblems.map((problem, idx) => (
                <Badge key={idx} variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                  {problem}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Business Unit Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Recommendations by Unit</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {businessUnitResults.map((result) => (
            <div
              key={result.unit}
              className={`bg-gradient-to-br ${businessUnitColors[result.unit]} border rounded-lg p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-cyan-400">{businessUnitIcons[result.unit]}</div>
                  <h4 className="font-semibold text-white">{result.unit}</h4>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {(result.confidence * 100).toFixed(0)}%
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(result.metrics).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-slate-800/50 rounded p-2">
                    <p className="text-xs text-gray-400">{key}</p>
                    <p className="text-sm font-semibold text-cyan-300">
                      {typeof value === 'number' && value < 1 ? (value * 100).toFixed(1) + '%' : value.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Top Recommendation */}
              {result.recommendations.length > 0 && (
                <div className="bg-slate-800/50 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Action</p>
                  <p className="text-sm text-white">{result.recommendations[0]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Deployment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Deployed Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-slate-800 border border-purple-500/30 rounded p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-white text-sm">{agent.agent}</p>
                  <p className="text-xs text-purple-300">{agent.skill}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{agent.output}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Findings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Research & Benchmarks</h3>
        <div className="space-y-3">
          {research.map((finding, idx) => (
            <div
              key={idx}
              className="bg-slate-800 border border-indigo-500/30 rounded p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium text-white text-sm">{finding.query}</p>
                  <p className="text-xs text-gray-400 mt-1">{finding.source}</p>
                </div>
                <Badge variant="outline" className="text-indigo-300 border-indigo-500/30">
                  {(finding.relevance * 100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-xs text-gray-300">{finding.evidence}</p>
              <p className="text-xs text-indigo-400 mt-2">Benchmark: {finding.benchmark}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Impact Assessment</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Economic', value: impact.economic, color: 'text-green-400' },
            { label: 'Social', value: impact.social, color: 'text-blue-400' },
            { label: 'Environmental', value: impact.environmental, color: 'text-emerald-400' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm text-gray-400 mb-2">{item.label}</p>
              <p className={`text-3xl font-bold ${item.color}`}>
                {(item.value * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-green-500/20">
          <p className="text-sm text-gray-300">
            <strong>Overall Score:</strong> <span className="text-lg font-bold text-green-400">{(impact.overall * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
