import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { OperationalInputModule } from "@/components/orchestrator/OperationalInputModule";
import { OperationalContext } from "@/services/OrchestratorService";

export default function Home() {
  const [, navigate] = useLocation();

  const handleContextSubmit = (context: OperationalContext) => {
    // Navigate to orchestrator with context
    navigate("/orchestrator");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* SECTION 1: MINIMAL HERO + IMMEDIATE INPUT */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full space-y-12">
          {/* Minimal Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Operational Intelligence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-purple-400">
                Orchestrator
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Upload your operational context. Get actionable intelligence.
            </p>
          </div>

          {/* OperationalInputModule - CENTRAL & VISIBLE */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <OperationalInputModule onContextSubmit={handleContextSubmit} />
          </div>

          {/* Quick Info */}
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-400">
              The system classifies your context, activates relevant business units, and generates strategic recommendations.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/orchestrator")}
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
            >
              View Full Orchestrator <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-slate-800 bg-slate-950">
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
