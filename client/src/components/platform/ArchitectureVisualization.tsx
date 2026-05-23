/**
 * Architecture Visualization Component
 * Interactive visualization of NEXERGY AI platform layers
 */

import React, { useState } from 'react';
import { platformArchitectureLayers } from '@/constants/config';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface ArchitectureVisualizationProps {
  className?: string;
}

export const ArchitectureVisualization: React.FC<ArchitectureVisualizationProps> = ({
  className,
}) => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className={cn('w-full', className)}>
      {/* Title */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          PLATAFORMA NEXERGY AI
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Inteligencia Operacional en Tiempo Real
        </p>
      </div>

      {/* Layers Container */}
      <div className="space-y-4">
        {platformArchitectureLayers.map((layer, index) => {
          const IconComponent = (Icons as any)[layer.icon] || Icons.Box;
          const isActive = activeLayer === layer.id;

          return (
            <div
              key={layer.id}
              onClick={() => setActiveLayer(isActive ? null : layer.id)}
              className={cn(
                'p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer',
                'hover:shadow-lg',
                isActive
                  ? 'border-current bg-opacity-10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              )}
              style={{
                borderColor: isActive ? layer.color : undefined,
                backgroundColor: isActive ? `${layer.color}15` : undefined,
              }}
            >
              {/* Layer Header */}
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${layer.color}20` }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: layer.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: layer.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {layer.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {layer.subtitle}
                  </p>
                </div>
              </div>

              {/* Layer Description */}
              <div className="mt-4 pl-16">
                <p className="text-gray-700 dark:text-gray-300">
                  {layer.description}
                </p>
              </div>

              {/* Expanded Content */}
              {isActive && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 pl-16 space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Key Components
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getLayerComponents(layer.id).map((component) => (
                        <div
                          key={component}
                          className="text-sm px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          • {component}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Capabilities
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {getLayerCapabilities(layer.id).map((capability) => (
                        <li key={capability}>✓ {capability}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data Flow Indicator */}
      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <span className="font-semibold">💡 Tip:</span> Click on any layer to explore its components and capabilities
        </p>
      </div>
    </div>
  );
};

/**
 * Get components for a layer
 */
function getLayerComponents(layerId: string): string[] {
  const components: Record<string, string[]> = {
    data: ['Data Sources', 'Integration Hub', 'Data Lake', 'ETL Pipeline'],
    intelligence: ['AI Models', 'Analytics Engine', 'Pattern Recognition', 'ML Pipeline'],
    simulation: ['Digital Twins', 'Physics Engine', 'Scenario Builder', 'Prediction Engine'],
    decision: ['Governance Layer', 'Policy Engine', 'Compliance Monitor', 'Risk Assessment'],
    execution: ['Action Orchestrator', 'Automation Engine', 'System Integration', 'Feedback Loop'],
  };
  return components[layerId] || [];
}

/**
 * Get capabilities for a layer
 */
function getLayerCapabilities(layerId: string): string[] {
  const capabilities: Record<string, string[]> = {
    data: [
      'Multi-source integration',
      'Real-time data ingestion',
      'Data quality validation',
      'Centralized storage',
    ],
    intelligence: [
      'Pattern detection',
      'Anomaly identification',
      'Predictive analytics',
      'Intelligent recommendations',
    ],
    simulation: [
      'Real-time simulation',
      'Scenario analysis',
      'Performance prediction',
      'What-if modeling',
    ],
    decision: [
      'Policy compliance',
      'Risk evaluation',
      'Decision optimization',
      'Audit trails',
    ],
    execution: [
      'Autonomous actions',
      'System orchestration',
      'Real-time response',
      'Performance feedback',
    ],
  };
  return capabilities[layerId] || [];
}

export default ArchitectureVisualization;
