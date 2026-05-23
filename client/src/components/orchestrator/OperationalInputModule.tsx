import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Send, Loader2 } from 'lucide-react';
import { OperationalContext } from '@/services/OrchestratorService';

interface OperationalInputModuleProps {
  onContextSubmit: (context: OperationalContext) => void;
  isLoading?: boolean;
}

export function OperationalInputModule({ onContextSubmit, isLoading = false }: OperationalInputModuleProps) {
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState<OperationalContext['industry']>('manufacturing');
  const [priority, setPriority] = useState<OperationalContext['priority']>('medium');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [problems, setProblems] = useState<string[]>([]);
  const [currentProblem, setCurrentProblem] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleAddProblem = () => {
    if (currentProblem.trim()) {
      setProblems(prev => [...prev, currentProblem]);
      setCurrentProblem('');
    }
  };

  const handleRemoveProblem = (index: number) => {
    setProblems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Please describe your operational context');
      return;
    }

    const context: OperationalContext = {
      id: `ctx-${Date.now()}`,
      description,
      industry,
      priority,
      problems,
      uploadedFiles
    };

    onContextSubmit(context);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Operational Context Input</h2>
        <p className="text-gray-400">
          Describe your operational challenge, business problem, or process inefficiency.
          NEXERGY AI will orchestrate intelligence across all business units.
        </p>
      </div>

      {/* Main Input Card */}
      <Card className="border-cyan-500/20 bg-slate-900/50 backdrop-blur">
        <div className="p-6 space-y-6">
          {/* Industry Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Industry Sector</label>
            <Select value={industry} onValueChange={(value: any) => setIndustry(value)}>
              <SelectTrigger className="border-cyan-500/30 bg-slate-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30">
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="mining">Mining</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Priority Level</label>
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger className="border-cyan-500/30 bg-slate-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Operational Context Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Operational Context</label>
            <Textarea
              placeholder="Describe your operational challenge, business problem, or process inefficiency. Be specific about:
• What is the problem?
• What are the current metrics?
• What have you tried?
• What are the constraints?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 border-cyan-500/30 bg-slate-800 text-white placeholder-gray-500"
            />
            <p className="text-xs text-gray-500">{description.length} characters</p>
          </div>

          {/* Problems List */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Specific Problems (Optional)</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add specific problem..."
                value={currentProblem}
                onChange={(e) => setCurrentProblem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddProblem()}
                className="flex-1 px-3 py-2 border border-cyan-500/30 bg-slate-800 text-white placeholder-gray-500 rounded text-sm"
              />
              <Button
                onClick={handleAddProblem}
                variant="outline"
                size="sm"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                Add
              </Button>
            </div>
            {problems.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {problems.map((problem, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 cursor-pointer hover:bg-cyan-500/30"
                    onClick={() => handleRemoveProblem(index)}
                  >
                    {problem} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Upload Files (Optional)</label>
            <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                <p className="text-sm text-gray-300">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, CSV, JSON, or images</p>
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-1 mt-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-gray-400 bg-slate-800 p-2 rounded">
                    <span>{file.name}</span>
                    <button
                      onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !description.trim()}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Orchestrating Intelligence...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Orchestrate Intelligence
            </>
          )}
        </Button>
      </div>

      {/* Info Box */}
      <Card className="border-green-500/20 bg-green-500/5 p-4">
        <p className="text-sm text-green-300">
          <strong>How it works:</strong> Your operational context will be classified, routed through
          NEXERGY INDUSTRIAL, ENERGY, AGENTS, DIGITAL_TWIN, and LABS business units for comprehensive
          analysis and recommendations.
        </p>
      </Card>
    </div>
  );
}
