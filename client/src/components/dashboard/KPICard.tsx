/**
 * KPI Card Component
 * Displays key performance indicators with real-time updates
 */

import React from 'react';
import { KPI } from '@/types';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  kpi: KPI;
  onClick?: () => void;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, onClick, className }) => {
  const statusColors = {
    healthy: 'border-green-500 bg-green-50 dark:bg-green-950',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    critical: 'border-red-500 bg-red-50 dark:bg-red-950',
  };

  const statusTextColors = {
    healthy: 'text-green-700 dark:text-green-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    critical: 'text-red-700 dark:text-red-300',
  };

  const trendIcon = kpi.trend === 'up' ? (
    <TrendingUp className="w-4 h-4 text-green-500" />
  ) : kpi.trend === 'down' ? (
    <TrendingDown className="w-4 h-4 text-red-500" />
  ) : (
    <div className="w-4 h-4 rounded-full bg-gray-400" />
  );

  const statusIcon = kpi.status === 'healthy' ? (
    <CheckCircle className="w-5 h-5 text-green-500" />
  ) : kpi.status === 'warning' ? (
    <AlertCircle className="w-5 h-5 text-yellow-500" />
  ) : (
    <AlertCircle className="w-5 h-5 text-red-500" />
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-lg',
        statusColors[kpi.status],
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {kpi.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {kpi.value}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {kpi.unit}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {statusIcon}
        </div>
      </div>

      {/* Trend & Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {trendIcon}
          <span className={cn(
            'text-sm font-semibold',
            kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {kpi.trend === 'up' ? '+' : ''}{kpi.trendPercent}%
          </span>
        </div>
        <span className={cn(
          'text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded',
          statusTextColors[kpi.status],
          'bg-white/50 dark:bg-black/20'
        )}>
          {kpi.status}
        </span>
      </div>

      {/* Last Updated */}
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
        Updated {formatTime(kpi.lastUpdated)}
      </p>
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

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export default KPICard;
