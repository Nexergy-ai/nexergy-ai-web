import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
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
      problems: [],
      uploadedFiles
    };

    onContextSubmit(context);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-white">Describe Your Challenge</h2>
        <p className="text-gray-400 text-sm">
          Upload context and NEXERGY AI will orchestrate intelligence across all business units.
        </p>
      </div>

      {/* Main Input Card */}
      <Card className="border-cyan-500/20 bg-slate-900/50 backdrop-blur">
        <div className="p-6 space-y-4">
          {/* Industry & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Industry</label>
              <Select value={industry} onValueChange={(value: any) => setIndustry(value)}>
                <SelectTrigger className="border-cyan-500/30 bg-slate-800 text-white text-sm">
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
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Priority</label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger className="border-cyan-500/30 bg-slate-800 text-white text-sm">
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
          </div>

          {/* Operational Context Description - PRIMARY FOCUS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Operational Challenge</label>
            <Textarea
              placeholder="Describe your operational challenge, business problem, or process inefficiency. Be specific about what is the problem, current metrics, what you've tried, and constraints."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-40 border-cyan-500/30 bg-slate-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">{description.length} characters</p>
          </div>

          {/* File Upload - Compact */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Attach Files (Optional)</label>
            <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-4 text-center hover:border-cyan-500/50 transition">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-300">Click to upload</span>
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-1 mt-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-xs text-gray-400 bg-slate-800 p-2 rounded">
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
      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !description.trim()}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Orchestrating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Orchestrate Intelligence
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
