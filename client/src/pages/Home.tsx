import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Upload, Zap, Factory, Brain, Globe } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { OperationalInputModule } from "@/components/orchestrator/OperationalInputModule";

export default function Home() {
  const [, navigate] = useLocation();
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* SECTION 1: SHORT HERO */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Operational Intelligence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-purple-400">
                Orchestrator
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Upload operational context. Activate intelligent workflows. Generate strategic insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowInput(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-semibold"
            >
              Start Orchestration <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: OPERATIONAL INPUT MODULE (MAIN FOCUS) */}
      <section className="py-20 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Describe Your Operational Challenge
            </h2>
            <p className="text-slate-300 text-lg">
              The system activates business units aligned to your industry and problem.
            </p>
          </div>

          {showInput ? (
            <OperationalInputModule />
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-6">
                Upload files, describe your operational context, and let the orchestrator activate intelligence.
              </p>
              <Button
                onClick={() => setShowInput(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3"
              >
                Open Input Module
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: ORCHESTRATOR FLOW */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Operational Flow
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Classification */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">1. Classification</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Context analyzed. Industry and problem identified.
              </p>
            </Card>

            {/* Business Units */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-green-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-white">2. Activation</h3>
              </div>
              <p className="text-slate-300 text-sm">
                5 business units activated: INDUSTRIAL, ENERGY, AGENTS, DIGITAL_TWIN, LABS.
              </p>
            </Card>

            {/* Agents */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">3. Agents</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Specialized agents deployed. Orchestration begins.
              </p>
            </Card>

            {/* Research */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">4. Research</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Evidence gathered. Benchmarks generated.
              </p>
            </Card>

            {/* Impact */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-green-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-white">5. Impact</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Economic, social, environmental impact scored.
              </p>
            </Card>

            {/* Digital Twin */}
            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">6. Digital Twin</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Iteration preview. Optimization simulated.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4: IMPACT & OUTPUT */}
      <section className="py-20 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Operational Output
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-cyan-400 font-semibold mb-3">Efficiency Gains</h3>
              <p className="text-slate-300 text-sm">
                Downtime reduction, predictive maintenance, process optimization.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-green-400 font-semibold mb-3">Sustainability</h3>
              <p className="text-slate-300 text-sm">
                ESG optimization, energy efficiency, environmental impact.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-purple-400 font-semibold mb-3">Strategic Intelligence</h3>
              <p className="text-slate-300 text-sm">
                Executive insights, benchmarking, operational recommendations.
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate("/orchestrator")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
            >
              Go to Full Orchestrator <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto text-center text-slate-400 text-sm">
          <p>NEXERGY AI — Operational Intelligence Infrastructure</p>
          <p className="mt-2">
            <a href="https://github.com/Nexergy-ai/nexergy-ai-web" className="text-cyan-400 hover:text-cyan-300">
              GitHub Repository
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
