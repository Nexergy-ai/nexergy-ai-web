/**
 * Global Type Definitions
 * Centralized types for the NEXERGY AI platform
 */

// ============================================================================
// BUSINESS UNITS
// ============================================================================

export type BusinessUnitType = 
  | 'industrial' 
  | 'energy' 
  | 'agents' 
  | 'digital-twin' 
  | 'labs';

export interface BusinessUnit {
  id: BusinessUnitType;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  useCases: string[];
}

// ============================================================================
// OPERATIONAL METRICS & KPIs
// ============================================================================

export interface KPI {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  threshold?: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: Date;
}

export interface OperationalMetrics {
  productionEfficiency: KPI;
  equipmentUptime: KPI;
  energyConsumption: KPI;
  maintenanceAlerts: KPI;
  costSavings: KPI;
  co2Reduction: KPI;
}

// ============================================================================
// ANOMALIES & ALERTS
// ============================================================================

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: Date;
  affectedSystem: string;
  recommendedAction: string;
  confidence: number; // 0-100
}

export interface Alert extends Anomaly {
  type: 'anomaly' | 'maintenance' | 'compliance' | 'performance';
  source: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// DIGITAL TWIN
// ============================================================================

export interface DigitalTwinParameter {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface DigitalTwin {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'offline';
  parameters: DigitalTwinParameter[];
  lastSync: Date;
  efficiency: number; // 0-100
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  parameters: Record<string, any>;
  results?: SimulationResult;
}

export interface SimulationResult {
  scenarioId: string;
  outcome: string;
  metrics: Record<string, number>;
  recommendations: string[];
  confidence: number;
}

// ============================================================================
// AI AGENTS & ORCHESTRATION
// ============================================================================

export type AgentType = 
  | 'predictive-maintenance' 
  | 'energy-optimization' 
  | 'anomaly-detection' 
  | 'recommendation-engine' 
  | 'compliance-monitor';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: 'active' | 'inactive' | 'error';
  description: string;
  capabilities: string[];
  lastRun?: Date;
  nextRun?: Date;
}

export interface AgentAction {
  id: string;
  agentId: string;
  action: string;
  parameters: Record<string, any>;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  result?: any;
  timestamp: Date;
}

export interface AgentRecommendation {
  id: string;
  agentId: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number; // 0-100
  suggestedAction: string;
  estimatedBenefit: string;
  timestamp: Date;
}

// ============================================================================
// GOVERNANCE & COMPLIANCE
// ============================================================================

export interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  standard: string; // ISO 42001, SOC 2, GDPR, etc.
  status: 'compliant' | 'non-compliant' | 'pending-review';
  lastAudit: Date;
  nextAudit: Date;
}

export interface ComplianceCheck {
  id: string;
  policyId: string;
  checkType: string;
  result: 'pass' | 'fail' | 'warning';
  details: string;
  timestamp: Date;
  auditor?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  resource: string;
  changes: Record<string, any>;
  timestamp: Date;
  status: 'success' | 'failure';
}

// ============================================================================
// PLATFORM ARCHITECTURE
// ============================================================================

export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  components: ArchitectureComponent[];
  order: number;
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'operational' | 'maintenance' | 'offline';
  connections: string[]; // Component IDs
}

export interface DataFlow {
  id: string;
  source: string; // Component ID
  target: string; // Component ID
  dataType: string;
  frequency: string;
  status: 'active' | 'inactive';
}

// ============================================================================
// INDUSTRIAL CONTEXT
// ============================================================================

export type IndustryType = 
  | 'energy' 
  | 'oil-gas' 
  | 'industrial-plants' 
  | 'utilities' 
  | 'smart-infrastructure';

export interface IndustryProfile {
  id: string;
  name: IndustryType;
  displayName: string;
  description: string;
  challenges: string[];
  solutions: string[];
  targetMetrics: string[];
}

export interface IndustrialContext {
  industry: IndustryType;
  plantType: string;
  capacity: number;
  location: string;
  operatingHours: string;
  criticalSystems: string[];
}

// ============================================================================
// USER & AUTHENTICATION (Future)
// ============================================================================

export type UserRole = 'admin' | 'operator' | 'analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

// ============================================================================
// LEAD CAPTURE & CONTACT
// ============================================================================

export interface ContactFormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  unidad: BusinessUnitType;
  mensaje: string;
}

export interface Lead {
  id: string;
  contactData: ContactFormData;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  source: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// DASHBOARD STATE
// ============================================================================

export interface DashboardState {
  metrics: OperationalMetrics;
  anomalies: Anomaly[];
  alerts: Alert[];
  digitalTwins: DigitalTwin[];
  agents: Agent[];
  recommendations: AgentRecommendation[];
  lastUpdated: Date;
  loading: boolean;
  error?: string;
}

// ============================================================================
// THEME & UI
// ============================================================================

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  border: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: {
    dashboard: boolean;
    agents: boolean;
    digitalTwins: boolean;
    governance: boolean;
    analytics: boolean;
  };
}
