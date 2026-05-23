/**
 * Mock Data Generators
 * Generates realistic mock data for operational intelligence dashboard
 */

import { OperationalMetrics, KPI, Anomaly } from '@/types';
import { mockDataConfig } from '@/constants/config';

/**
 * Generate random number within range
 */
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random variation
 */
function applyVariation(baseValue: number, variationPercent: number = mockDataConfig.metricsVariation): number {
  const variation = baseValue * variationPercent;
  return baseValue + (Math.random() - 0.5) * 2 * variation;
}

/**
 * Determine KPI status based on value and threshold
 */
function determineStatus(value: number, threshold: number, isInverse: boolean = false): 'healthy' | 'warning' | 'critical' {
  if (isInverse) {
    if (value <= threshold * 0.5) return 'critical';
    if (value <= threshold * 0.8) return 'warning';
  } else {
    if (value >= threshold * 1.5) return 'critical';
    if (value >= threshold * 1.2) return 'warning';
  }
  return 'healthy';
}

/**
 * Generate mock operational metrics
 */
export function generateMockMetrics(): OperationalMetrics {
  const baseEfficiency = 92;
  const baseUptime = 98.5;
  const baseEnergy = 1250;
  const baseAlerts = 3;
  const baseSavings = 125000;
  const baseCO2 = 450;

  return {
    productionEfficiency: {
      id: 'production-efficiency',
      label: 'Production Efficiency',
      value: Math.round(applyVariation(baseEfficiency)),
      unit: '%',
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendPercent: randomBetween(1, 5),
      threshold: 85,
      status: determineStatus(baseEfficiency, 85),
      lastUpdated: new Date(),
    },
    equipmentUptime: {
      id: 'equipment-uptime',
      label: 'Equipment Uptime',
      value: applyVariation(baseUptime).toFixed(2),
      unit: '%',
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendPercent: randomBetween(0, 2),
      threshold: 95,
      status: determineStatus(baseUptime, 95),
      lastUpdated: new Date(),
    },
    energyConsumption: {
      id: 'energy-consumption',
      label: 'Energy Consumption',
      value: Math.round(applyVariation(baseEnergy)),
      unit: 'kWh',
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendPercent: randomBetween(1, 8),
      threshold: 1400,
      status: determineStatus(baseEnergy, 1400, true),
      lastUpdated: new Date(),
    },
    maintenanceAlerts: {
      id: 'maintenance-alerts',
      label: 'Maintenance Alerts',
      value: randomBetween(1, 8),
      unit: 'active',
      trend: Math.random() > 0.6 ? 'down' : 'up',
      trendPercent: randomBetween(0, 3),
      threshold: 5,
      status: randomBetween(1, 8) > 5 ? 'warning' : 'healthy',
      lastUpdated: new Date(),
    },
    costSavings: {
      id: 'cost-savings',
      label: 'Cost Savings (YTD)',
      value: Math.round(applyVariation(baseSavings)),
      unit: 'USD',
      trend: 'up',
      trendPercent: randomBetween(5, 15),
      threshold: 100000,
      status: 'healthy',
      lastUpdated: new Date(),
    },
    co2Reduction: {
      id: 'co2-reduction',
      label: 'CO2 Reduction',
      value: Math.round(applyVariation(baseCO2)),
      unit: 'tons',
      trend: 'up',
      trendPercent: randomBetween(3, 12),
      threshold: 300,
      status: 'healthy',
      lastUpdated: new Date(),
    },
  };
}

/**
 * Generate mock anomalies
 */
export function generateMockAnomalies(): Anomaly[] {
  const anomalies: Anomaly[] = [];

  // Randomly generate anomalies based on probability
  if (Math.random() < mockDataConfig.anomalyProbability) {
    const severities: Array<'critical' | 'warning' | 'info'> = ['critical', 'warning', 'info'];
    const systems = [
      'Pump System A',
      'Compressor Unit B',
      'Heat Exchanger C',
      'Reactor Vessel D',
      'Control System E',
    ];

    const severity = severities[randomBetween(0, 2)];
    const system = systems[randomBetween(0, systems.length - 1)];

    anomalies.push({
      id: `anomaly-${Date.now()}`,
      title: `Anomaly Detected in ${system}`,
      description: generateAnomalyDescription(system),
      severity,
      status: 'active',
      timestamp: new Date(),
      affectedSystem: system,
      recommendedAction: generateRecommendedAction(system),
      confidence: randomBetween(75, 99),
    });
  }

  // Add some persistent anomalies
  if (Math.random() < 0.3) {
    anomalies.push({
      id: 'anomaly-persistent-1',
      title: 'Elevated Vibration Levels',
      description: 'Vibration levels in Pump System A are 15% above normal operating range',
      severity: 'warning',
      status: 'active',
      timestamp: new Date(Date.now() - 3600000),
      affectedSystem: 'Pump System A',
      recommendedAction: 'Schedule maintenance inspection within 24 hours',
      confidence: 87,
    });
  }

  return anomalies;
}

/**
 * Generate anomaly description
 */
function generateAnomalyDescription(system: string): string {
  const descriptions = [
    `Unusual pattern detected in ${system} parameters`,
    `Temperature deviation in ${system}`,
    `Pressure fluctuation in ${system}`,
    `Performance degradation in ${system}`,
    `Efficiency drop in ${system}`,
  ];
  return descriptions[randomBetween(0, descriptions.length - 1)];
}

/**
 * Generate recommended action
 */
function generateRecommendedAction(system: string): string {
  const actions = [
    `Perform diagnostic check on ${system}`,
    `Schedule maintenance for ${system}`,
    `Increase monitoring frequency for ${system}`,
    `Verify calibration of ${system}`,
    `Review operational parameters of ${system}`,
  ];
  return actions[randomBetween(0, actions.length - 1)];
}

/**
 * Generate mock recommendations
 */
export function generateMockRecommendations() {
  return [
    {
      id: 'rec-1',
      title: 'Optimize Pump Operating Schedule',
      description: 'Shift peak operations to off-peak hours to reduce energy costs by 12%',
      impact: 'high',
      confidence: 92,
      estimatedBenefit: '$15,000/month',
    },
    {
      id: 'rec-2',
      title: 'Preventive Maintenance on Compressor B',
      description: 'Schedule maintenance to prevent potential failure within 2 weeks',
      impact: 'high',
      confidence: 88,
      estimatedBenefit: 'Avoid $50,000+ downtime',
    },
    {
      id: 'rec-3',
      title: 'Adjust Temperature Setpoints',
      description: 'Reduce temperature by 2°C to improve efficiency without affecting output',
      impact: 'medium',
      confidence: 85,
      estimatedBenefit: '$8,000/month',
    },
  ];
}

/**
 * Generate mock digital twin data
 */
export function generateMockDigitalTwinData() {
  return {
    id: 'dt-plant-001',
    name: 'Industrial Plant Alpha',
    type: 'Manufacturing Facility',
    location: 'São Paulo, Brazil',
    status: 'operational',
    efficiency: randomBetween(85, 98),
    parameters: [
      {
        name: 'Temperature',
        value: randomBetween(45, 65),
        unit: '°C',
        min: 40,
        max: 70,
        status: 'normal',
      },
      {
        name: 'Pressure',
        value: randomBetween(8, 12),
        unit: 'bar',
        min: 5,
        max: 15,
        status: 'normal',
      },
      {
        name: 'Flow Rate',
        value: randomBetween(450, 550),
        unit: 'm³/h',
        min: 400,
        max: 600,
        status: 'normal',
      },
      {
        name: 'Vibration',
        value: randomBetween(2, 5),
        unit: 'mm/s',
        min: 0,
        max: 7,
        status: Math.random() > 0.8 ? 'warning' : 'normal',
      },
    ],
    lastSync: new Date(),
  };
}

/**
 * Generate mock agent actions
 */
export function generateMockAgentActions() {
  return [
    {
      id: 'action-1',
      agentId: 'agent-predictive-maintenance',
      action: 'Scheduled Maintenance Alert',
      status: 'completed',
      timestamp: new Date(Date.now() - 7200000),
      result: 'Maintenance scheduled for 2026-05-25',
    },
    {
      id: 'action-2',
      agentId: 'agent-energy-optimization',
      action: 'Load Balancing Adjustment',
      status: 'executing',
      timestamp: new Date(Date.now() - 600000),
    },
    {
      id: 'action-3',
      agentId: 'agent-anomaly-detection',
      action: 'Anomaly Investigation',
      status: 'pending',
      timestamp: new Date(),
    },
  ];
}

/**
 * Generate mock compliance checks
 */
export function generateMockComplianceChecks() {
  return [
    {
      id: 'check-1',
      policyId: 'policy-iso42001',
      checkType: 'AI Model Validation',
      result: 'pass',
      details: 'All AI models passed validation requirements',
      timestamp: new Date(Date.now() - 86400000),
      auditor: 'System Audit',
    },
    {
      id: 'check-2',
      policyId: 'policy-gdpr',
      checkType: 'Data Privacy Audit',
      result: 'pass',
      details: 'Data handling complies with GDPR requirements',
      timestamp: new Date(Date.now() - 172800000),
      auditor: 'External Auditor',
    },
    {
      id: 'check-3',
      policyId: 'policy-soc2',
      checkType: 'Security Assessment',
      result: 'pass',
      details: 'Security controls meet SOC 2 Type II requirements',
      timestamp: new Date(Date.now() - 259200000),
      auditor: 'System Audit',
    },
  ];
}

/**
 * Generate time series data for charts
 */
export function generateTimeSeriesData(points: number = 24) {
  const data = [];
  const now = Date.now();
  const interval = 3600000; // 1 hour

  for (let i = points; i >= 0; i--) {
    data.push({
      timestamp: new Date(now - i * interval),
      efficiency: randomBetween(85, 98),
      energy: randomBetween(1100, 1400),
      uptime: randomBetween(95, 99.5),
      alerts: randomBetween(0, 5),
    });
  }

  return data;
}
