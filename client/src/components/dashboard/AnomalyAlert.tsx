/**
 * Anomaly Alert Component
 * Displays detected anomalies with severity indicators
 */

import React from 'react';
import { Anomaly } from '@/types';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnomalyAlertProps {
  anomaly: Anomaly;
  onDismiss?: () => void;
  onAction?: () => void;
  className?: string;
}

export const AnomalyAlert: React.FC<AnomalyAlertProps> = ({
  anomaly,
  onDismiss,
  onAction,
  className,
}) => {
  const severityStyles = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-950',
      border: 'border-red-300 dark:border-red-700',
      icon: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950',
      border: 'border-yellow-300 dark:border-yellow-700',
      icon: 'text-yellow-600 dark:text-yellow-400',
      badge: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950',
      border: 'border-blue-300 dark:border-blue-700',
      icon: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    },
  };

  const style = severityStyles[anomaly.severity];

  const SeverityIcon = {
    critical: AlertTriangle,
    warning: AlertCircle,
    info: Info,
  }[anomaly.severity];

  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 transition-all duration-300',
        style.bg,
        style.border,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <SeverityIcon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', style.icon)} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {anomaly.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {anomaly.description}
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">System:</span>
          <p className="font-medium text-gray-900 dark:text-white">
            {anomaly.affectedSystem}
          </p>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
          <p className="font-medium text-gray-900 dark:text-white">
            {anomaly.confidence}%
          </p>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="mb-4 p-3 bg-white/50 dark:bg-black/20 rounded">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
          RECOMMENDED ACTION
        </p>
        <p className="text-sm text-gray-900 dark:text-white">
          {anomaly.recommendedAction}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded',
            style.badge
          )}>
            {anomaly.severity.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatTime(anomaly.timestamp)}
          </span>
        </div>
        {onAction && (
          <button
            onClick={onAction}
            className={cn(
              'text-xs font-semibold px-3 py-1 rounded transition-colors',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
              'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            Take Action
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Format time for display
 */
function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default AnomalyAlert;
