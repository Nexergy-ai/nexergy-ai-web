import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { OperationalInputModule } from '@/components/orchestrator/OperationalInputModule';
import { OrchestratorFlow } from '@/components/orchestrator/OrchestratorFlow';
import { OperationalContext, OrchestratorResult, orchestrateContext } from '@/services/OrchestratorService';
import { Loader2 } from 'lucide-react';

export default function OrchestratorPage() {
  const [, navigate] = useLocation();
  const [result, setResult] = useState<OrchestratorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract context from URL and auto-submit if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const contextParam = params.get('context');
    if (contextParam) {
      try {
        const context = JSON.parse(decodeURIComponent(contextParam));
        // Auto-submit the context
        handleContextSubmit(context);
        // Clean up URL
        navigate('/orchestrator');
      } catch (err) {
        console.error('Failed to parse context from URL:', err);
      }
    }
  }, []);

  const handleContextSubmit = async (context: OperationalContext) => {
    // Prevent re-submission if already loading or has results
    if (isLoading || result) return;
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
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            Operational Intelligence Orchestrator
          </h1>
          <p className="text-gray-400 mt-2">
            Upload context and get actionable recommendations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          // Input Phase
          <div>
            <OperationalInputModule
              onContextSubmit={handleContextSubmit}
              isLoading={isLoading}
            />
          </div>
        ) : (
          // Results Phase
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Analysis Complete</h2>
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
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Context</h3>
              <p className="text-gray-400">
                Processing your operational data...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-300">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 text-sm"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
