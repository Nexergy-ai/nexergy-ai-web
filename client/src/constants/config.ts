/**
 * Site Configuration
 * Centralized configuration for OPTINEX AI platform
 */

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'OPTINEX AI',
  description: 'Operational Intelligence Infrastructure',
  url: 'https://optinex.ai',
  apiUrl: process.env.VITE_API_URL || 'https://api.optinex.ai',
  environment: (process.env.VITE_ENVIRONMENT as any) || 'development',
  version: '1.0.0',
  features: {
    dashboard: true,
    agents: true,
    digitalTwins: true,
    governance: true,
    analytics: true,
  },
};

// ============================================================================
// GOVERNANCE & COMPLIANCE
// ============================================================================

export const governanceFramework = {
  iso42001: {
    title: 'GOBERNANZA (ISO 42001)',
    description: 'Ética, validación, gobierno, control de riesgos y transparencia algorítmica.',
    icon: 'Shield',
    color: '#0F3A7D',
  },
  mlops: {
    title: 'CUMPLIMIENTO Y MLOPS',
    description: 'Gestión del ciclo de vida de modelos, calidad, versionado y monitoreo continuo.',
    icon: 'GitBranch',
    color: '#00A86B',
  },
  blockchain: {
    title: 'INTEGRIDAD Y AUDITORÍA (BLOCKCHAIN)',
    description: 'Inmutabilidad, hashes criptográficos y timestamping para auditoría forense e integridad de IA.',
    icon: 'Lock',
    color: '#00D9FF',
  },
};

// ============================================================================
// CORE VALUES
// ============================================================================

export const coreValues = [
  {
    title: 'CONFIABILIDAD',
    description: 'Sistemas seguros y resilientes',
    icon: 'Shield',
  },
  {
    title: 'TRANSPARENCIA',
    description: 'Visibilidad total de punta a punta',
    icon: 'Eye',
  },
  {
    title: 'COLABORACIÓN',
    description: 'IA + personas trabajando juntas',
    icon: 'Users',
  },
  {
    title: 'SOSTENIBILIDAD',
    description: 'Eficiencia y cuidado de los recursos',
    icon: 'Leaf',
  },
  {
    title: 'INNOVACIÓN',
    description: 'Tecnología para resolver problemas reales',
    icon: 'Lightbulb',
  },
];

// ============================================================================
// MOCK DATA CONFIGURATION
// ============================================================================

export const mockDataConfig = {
  updateInterval: 3000, // ms
  anomalyProbability: 0.1, // 10% chance of anomaly
  alertRefreshRate: 5000, // ms
  metricsVariation: 0.05, // 5% variation
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const apiEndpoints = {
  // Operational Data
  metrics: '/api/v1/metrics',
  anomalies: '/api/v1/anomalies',
  alerts: '/api/v1/alerts',
  
  // Digital Twins
  digitalTwins: '/api/v1/digital-twins',
  simulate: '/api/v1/digital-twins/:id/simulate',
  
  // Agents
  agents: '/api/v1/agents',
  recommendations: '/api/v1/agents/recommendations',
  
  // Governance
  compliance: '/api/v1/governance/compliance',
  auditLogs: '/api/v1/governance/audit-logs',
  
  // Leads
  leads: '/api/v1/leads',
  
  // Authentication
  login: '/api/v1/auth/login',
  logout: '/api/v1/auth/logout',
  refresh: '/api/v1/auth/refresh',
};

// ============================================================================
// THEME COLORS
// ============================================================================

export const themeColors = {
  primary: '#0F3A7D', // Deep Blue
  secondary: '#00A86B', // Emerald Green
  accent: '#00D9FF', // Cyan
  background: '#FFFFFF',
  foreground: '#1F2937',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// ============================================================================
// ANIMATION TIMINGS
// ============================================================================

export const animationTimings = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
