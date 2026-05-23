/**
 * Dashboard Page
 * Operational Intelligence Dashboard with real-time metrics
 */

import React from 'react';
import { useOperationalData } from '@/hooks/useOperationalData';
import { KPICard } from '@/components/dashboard/KPICard';
import { AnomalyAlert } from '@/components/dashboard/AnomalyAlert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { metrics, anomalies, alerts, loading, error, refetch } = useOperationalData(true);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 rounded-lg bg-red-50 dark:bg-red-950 border-2 border-red-300 dark:border-red-700">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">Error Loading Dashboard</h3>
                <p className="text-red-800 dark:text-red-200 mt-1">{error}</p>
                <button
                  onClick={refetch}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Operational Intelligence
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time monitoring and predictive insights
              </p>
            </div>
            <button
              onClick={refetch}
              disabled={loading}
              className={cn(
                'p-3 rounded-lg transition-all duration-300',
                'bg-blue-600 text-white hover:bg-blue-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <RefreshCw className={cn('w-5 h-5', loading && 'animate-spin')} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Key Performance Indicators
          </h2>
          {metrics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(metrics).map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}
        </section>

        {/* Anomalies Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Anomalies
            </h2>
            <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-semibold">
              {anomalies.length} detected
            </span>
          </div>

          {anomalies.length > 0 ? (
            <div className="space-y-4">
              {anomalies.map((anomaly) => (
                <AnomalyAlert
                  key={anomaly.id}
                  anomaly={anomaly}
                  onAction={() => console.log('Action taken for:', anomaly.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-lg bg-green-50 dark:bg-green-950 border-2 border-green-300 dark:border-green-700 text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-green-900 dark:text-green-100 font-semibold">
                No anomalies detected
              </p>
              <p className="text-green-800 dark:text-green-200 text-sm mt-1">
                All systems operating within normal parameters
              </p>
            </div>
          )}
        </section>

        {/* Alerts Summary */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Alert Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Critical Alerts */}
            <div className="p-6 rounded-lg bg-red-50 dark:bg-red-950 border-2 border-red-300 dark:border-red-700">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                CRITICAL ALERTS
              </p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100">
                {alerts.filter((a) => a.severity === 'critical').length}
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                Require immediate attention
              </p>
            </div>

            {/* Warning Alerts */}
            <div className="p-6 rounded-lg bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-300 dark:border-yellow-700">
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                WARNING ALERTS
              </p>
              <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                {alerts.filter((a) => a.severity === 'warning').length}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
                Monitor closely
              </p>
            </div>

            {/* Info Alerts */}
            <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border-2 border-blue-300 dark:border-blue-700">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                INFO ALERTS
              </p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {alerts.filter((a) => a.severity === 'info').length}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                Informational only
              </p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-12 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">ℹ️ Note:</span> This dashboard displays mock data for demonstration purposes. 
            In Phase 3, it will be connected to real operational data sources and AI models.
          </p>
        </div>
      </div>
    </div>
  );
}
