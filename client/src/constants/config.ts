/**
 * Site Configuration
 * Centralized configuration for NEXERGY AI platform
 */

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'NEXERGY AI',
  description: 'AI-Native Operational Infrastructure for Industrial and Energy Systems',
  url: 'https://nexergy.ai',
  apiUrl: process.env.VITE_API_URL || 'https://api.nexergy.ai',
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
// NAVIGATION
// ============================================================================

export const navigationLinks = [
  { href: '/', label: 'Inicio', id: 'home' },
  { href: '#platform', label: 'Plataforma', id: 'platform' },
  { href: '#units', label: 'Soluciones', id: 'solutions' },
  { href: '#governance', label: 'Seguridad', id: 'governance' },
  { href: '#contact', label: 'Contacto', id: 'contact' },
];

// ============================================================================
// BUSINESS UNITS
// ============================================================================

export const businessUnitsConfig = {
  industrial: {
    id: 'industrial',
    name: 'NEXERGY INDUSTRIAL',
    tagline: 'Optimización de operaciones',
    description: 'Optimización de operaciones industriales, mantenimiento predictivo y reducción de downtime.',
    color: '#0F3A7D',
    icon: 'Factory',
    features: [
      'Predictive Maintenance',
      'Production Optimization',
      'Equipment Monitoring',
      'Downtime Reduction',
    ],
    useCases: [
      'Manufacturing Plants',
      'Heavy Industry',
      'Production Lines',
      'Equipment Maintenance',
    ],
  },
  energy: {
    id: 'energy',
    name: 'NEXERGY ENERGY',
    tagline: 'Gestión energética',
    description: 'Gestión y eficiencia energética para activos, plantas y redes críticas.',
    color: '#00A86B',
    icon: 'Zap',
    features: [
      'Energy Forecasting',
      'Load Optimization',
      'Grid Management',
      'Sustainability Tracking',
    ],
    useCases: [
      'Power Plants',
      'Renewable Energy',
      'Smart Grids',
      'Energy Distribution',
    ],
  },
  agents: {
    id: 'agents',
    name: 'NEXERGY AGENTS',
    tagline: 'Agentes de IA',
    description: 'Agentes de IA que monitorean, analizan y ejecutan acciones para mejorar resultados.',
    color: '#9333EA',
    icon: 'Cpu',
    features: [
      'AI Orchestration',
      'Autonomous Actions',
      'Real-time Monitoring',
      'Intelligent Recommendations',
    ],
    useCases: [
      'Operational Automation',
      'Decision Support',
      'Anomaly Detection',
      'Process Optimization',
    ],
  },
  'digital-twin': {
    id: 'digital-twin',
    name: 'NEXERGY DIGITAL TWIN',
    tagline: 'Gemelos digitales',
    description: 'Gemelos digitales que simulan, predicen y optimizan sistemas en tiempo real.',
    color: '#00D9FF',
    icon: 'Box',
    features: [
      'Real-time Simulation',
      'Scenario Analysis',
      'Predictive Modeling',
      'What-if Analysis',
    ],
    useCases: [
      'System Simulation',
      'Performance Prediction',
      'Risk Assessment',
      'Optimization Planning',
    ],
  },
  labs: {
    id: 'labs',
    name: 'NEXERGY LABS',
    tagline: 'Investigación e innovación',
    description: 'Investigación, desarrollo e innovación en IA, automatización y tecnologías emergentes.',
    color: '#F59E0B',
    icon: 'Beaker',
    features: [
      'AI Research',
      'Model Development',
      'Technology Innovation',
      'Emerging Tech Integration',
    ],
    useCases: [
      'Advanced Analytics',
      'New Technology Pilots',
      'Research Collaboration',
      'Innovation Projects',
    ],
  },
};

// ============================================================================
// INDUSTRIES
// ============================================================================

export const industriesConfig = [
  {
    id: 'energy',
    name: 'Energy',
    description: 'Power generation, distribution, and renewable energy systems',
    icon: 'Zap',
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    description: 'Upstream, midstream, and downstream operations',
    icon: 'Droplets',
  },
  {
    id: 'industrial-plants',
    name: 'Industrial Plants',
    description: 'Manufacturing, chemical, and processing facilities',
    icon: 'Factory',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    description: 'Water, gas, and infrastructure management',
    icon: 'Zap',
  },
  {
    id: 'smart-infrastructure',
    name: 'Smart Infrastructure',
    description: 'Smart cities, buildings, and connected systems',
    icon: 'Building2',
  },
];

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
// VALUE PROPOSITION
// ============================================================================

export const valueProposition = [
  {
    title: 'Alineamos estrategia y operación',
    description: 'Conectamos la visión estratégica con la ejecución operativa, asegurando que cada decisión contribuya a los objetivos del negocio.',
    icon: 'Target',
  },
  {
    title: 'Convertimos datos en decisiones y acciones',
    description: 'Transformamos datos operacionales en inteligencia accionable que empodera decisiones más inteligentes, rápidas y confiables.',
    icon: 'TrendingUp',
  },
  {
    title: 'Operación más eficiente, segura y sostenible',
    description: 'Optimizamos operaciones con automatización, resiliencia y seguridad en el núcleo, reduciendo costos y riesgos.',
    icon: 'Leaf',
  },
  {
    title: 'Valor medible y escalable',
    description: 'Construimos soluciones escalables que crecen con tu negocio y entregan compounding value a través del tiempo.',
    icon: 'BarChart3',
  },
];

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
// PLATFORM ARCHITECTURE LAYERS
// ============================================================================

export const platformArchitectureLayers = [
  {
    id: 'data',
    name: 'CONECTA',
    subtitle: 'Data Layer',
    description: 'Integra y centraliza datos de múltiples fuentes',
    icon: 'Database',
    color: '#0F3A7D',
  },
  {
    id: 'intelligence',
    name: 'ENTIENDE',
    subtitle: 'AI Intelligence Layer',
    description: 'Aplica IA y analítica para comprender patrones',
    icon: 'Brain',
    color: '#00A86B',
  },
  {
    id: 'simulation',
    name: 'SIMULA',
    subtitle: 'Digital Twin Layer',
    description: 'Crea modelos y escenarios para predecir resultados',
    icon: 'Box',
    color: '#00D9FF',
  },
  {
    id: 'decision',
    name: 'DECIDE',
    subtitle: 'Governance Layer',
    description: 'IA recomienda la mejor acción basada en datos',
    icon: 'Cpu',
    color: '#9333EA',
  },
  {
    id: 'execution',
    name: 'EJECUTA',
    subtitle: 'Execution Layer',
    description: 'Ejecuta la decisión en los sistemas y el entorno real',
    icon: 'Play',
    color: '#F59E0B',
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
