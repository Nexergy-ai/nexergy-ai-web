import { useState } from 'react';
import { OperationalInputModule } from '@/components/orchestrator/OperationalInputModule';
import { OrchestratorFlow } from '@/components/orchestrator/OrchestratorFlow';
import { OperationalContext, OrchestratorResult, orchestrateContext } from '@/services/OrchestratorService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function OrchestratorPage() {
  const [result, setResult] = useState<OrchestratorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContextSubmit = async (context: OperationalContext) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orchestrationResult = await orchestrateContext(context);
      setResult(orchestrationResult);
    } catch (err) {
      setError('Failed to orchestrate context. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              Operational Intelligence Orchestrator
            </h1>
            <p className="text-gray-400 mt-2">
              Transform operational challenges into actionable intelligence
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!result ? (
            // Input Phase
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <OperationalInputModule
                onContextSubmit={handleContextSubmit}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            // Results Phase
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Orchestration Complete</h2>
                  <p className="text-gray-400 mt-1">
                    Context: <span className="text-cyan-400">{result.contextId}</span>
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-cyan-500/30 transition"
                >
                  New Analysis
                </button>
              </div>

              {/* Orchestration Flow */}
              <OrchestratorFlow
                classification={result.classification}
                businessUnitResults={result.businessUnitResults}
                agents={result.agents}
                research={result.research}
                impact={result.impact}
                executionTime={result.executionTime}
              />

              {/* Executive Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-slate-900 to-slate-800 border border-green-500/30 rounded-lg p-8"
              >
                <h3 className="text-xl font-bold text-white mb-4">Executive Summary</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Your operational context has been comprehensively analyzed across {result.businessUnitResults.length} business units.
                    The orchestrator has identified key opportunities for improvement and generated specific recommendations.
                  </p>
                  <p>
                    <strong>Next Steps:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Review the detailed recommendations from each business unit</li>
                    <li>Examine the research findings and industry benchmarks</li>
                    <li>Assess the triple impact analysis (economic, social, environmental)</li>
                    <li>Implement the highest-priority recommendations</li>
                    <li>Schedule a digital twin iteration to validate improvements</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50"
            >
              <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Orchestrating Intelligence</h3>
                <p className="text-gray-400">
                  Classifying context, activating business units, deploying agents...
                </p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-300"
            >
              <h3 className="font-bold mb-2">Error</h3>
              <p>{error}</p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 text-sm"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
