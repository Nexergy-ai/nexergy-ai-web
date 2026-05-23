/**
 * Hook: useOperationalData
 * Manages operational metrics and real-time data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import { OperationalMetrics, KPI, Anomaly, Alert } from '@/types';
import { generateMockMetrics, generateMockAnomalies } from '@/data/mock/generators';
import { mockDataConfig } from '@/constants/config';

export interface UseOperationalDataReturn {
  metrics: OperationalMetrics | null;
  anomalies: Anomaly[];
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isRealTime: boolean;
}

/**
 * Hook to fetch and manage operational data
 * Currently uses mock data, will integrate with real API in Phase 3
 */
export function useOperationalData(
  realTime: boolean = true,
  interval: number = mockDataConfig.updateInterval
): UseOperationalDataReturn {
  const [metrics, setMetrics] = useState<OperationalMetrics | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch operational data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Generate mock data
      const mockMetrics = generateMockMetrics();
      const mockAnomalies = generateMockAnomalies();

      setMetrics(mockMetrics);
      setAnomalies(mockAnomalies);
      
      // Convert anomalies to alerts
      const mockAlerts: Alert[] = mockAnomalies.map((anomaly) => ({
        ...anomaly,
        type: 'anomaly',
        source: 'operational-intelligence',
      }));
      
      setAlerts(mockAlerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch operational data');
      console.error('Error fetching operational data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time updates
  useEffect(() => {
    if (!realTime) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => clearInterval(intervalId);
  }, [realTime, interval, fetchData]);

  return {
    metrics,
    anomalies,
    alerts,
    loading,
    error,
    refetch: fetchData,
    isRealTime: realTime,
  };
}

/**
 * Hook to fetch specific KPI
 */
export function useKPI(kpiId: string) {
  const { metrics, loading, error } = useOperationalData();
  
  const kpi = metrics ? Object.values(metrics).find((m) => m.id === kpiId) : null;

  return { kpi, loading, error };
}

/**
 * Hook to monitor anomalies
 */
export function useAnomalies(severity?: 'critical' | 'warning' | 'info') {
  const { anomalies, loading, error, refetch } = useOperationalData();

  const filtered = severity
    ? anomalies.filter((a) => a.severity === severity)
    : anomalies;

  return { anomalies: filtered, loading, error, refetch };
}

/**
 * Hook to monitor critical alerts
 */
export function useCriticalAlerts() {
  const { alerts, loading, error } = useOperationalData();

  const critical = alerts.filter((a) => a.severity === 'critical');

  return { alerts: critical, count: critical.length, loading, error };
}

/**
 * Hook to get dashboard summary
 */
export function useDashboardSummary() {
  const { metrics, anomalies, alerts, loading, error } = useOperationalData();

  const summary = {
    totalMetrics: metrics ? Object.keys(metrics).length : 0,
    activeAnomalies: anomalies.length,
    criticalAlerts: alerts.filter((a) => a.severity === 'critical').length,
    warningAlerts: alerts.filter((a) => a.severity === 'warning').length,
    healthStatus: calculateHealthStatus(metrics, anomalies),
  };

  return { summary, loading, error };
}

/**
 * Calculate overall health status
 */
function calculateHealthStatus(
  metrics: OperationalMetrics | null,
  anomalies: Anomaly[]
): 'healthy' | 'warning' | 'critical' {
  if (!metrics) return 'warning';

  const criticalMetrics = Object.values(metrics).filter((m) => m.status === 'critical').length;
  const criticalAnomalies = anomalies.filter((a) => a.severity === 'critical').length;

  if (criticalMetrics > 0 || criticalAnomalies > 0) return 'critical';
  
  const warningMetrics = Object.values(metrics).filter((m) => m.status === 'warning').length;
  const warningAnomalies = anomalies.filter((a) => a.severity === 'warning').length;

  if (warningMetrics > 0 || warningAnomalies > 0) return 'warning';

  return 'healthy';
}
