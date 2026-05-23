/**
 * API Client
 * Centralized API communication with error handling and interceptors
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from '@/types';

/**
 * Create API client instance
 */
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.VITE_API_URL || 'http://localhost:8000';

  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor: Add auth token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: Handle errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Handle unauthorized - refresh token or redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

/**
 * API Methods
 */

// ============================================================================
// METRICS
// ============================================================================

export const metricsApi = {
  /**
   * Get current operational metrics
   */
  getCurrent: async () => {
    try {
      const response = await apiClient.get('/api/v1/metrics');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      throw error;
    }
  },

  /**
   * Get historical metrics for charting
   */
  getHistory: async (options?: {
    interval?: '1m' | '5m' | '1h' | '1d';
    limit?: number;
    startTime?: string;
    endTime?: string;
  }) => {
    try {
      const response = await apiClient.get('/api/v1/metrics/history', {
        params: options,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch metrics history:', error);
      throw error;
    }
  },
};

// ============================================================================
// ANOMALIES
// ============================================================================

export const anomaliesApi = {
  /**
   * Get active anomalies
   */
  getActive: async (options?: {
    severity?: 'critical' | 'warning' | 'info';
    limit?: number;
  }) => {
    try {
      const response = await apiClient.get('/api/v1/anomalies', {
        params: options,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch anomalies:', error);
      throw error;
    }
  },

  /**
   * Acknowledge an anomaly
   */
  acknowledge: async (anomalyId: string, notes?: string) => {
    try {
      const response = await apiClient.post(
        `/api/v1/anomalies/${anomalyId}/acknowledge`,
        { notes }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to acknowledge anomaly:', error);
      throw error;
    }
  },
};

// ============================================================================
// ALERTS
// ============================================================================

export const alertsApi = {
  /**
   * Get all alerts with filtering
   */
  getAll: async (options?: {
    severity?: 'critical' | 'warning' | 'info';
    status?: 'active' | 'acknowledged' | 'resolved';
    limit?: number;
  }) => {
    try {
      const response = await apiClient.get('/api/v1/alerts', {
        params: options,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      throw error;
    }
  },
};

// ============================================================================
// DIGITAL TWINS
// ============================================================================

export const digitalTwinsApi = {
  /**
   * List all digital twins
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/v1/digital-twins');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch digital twins:', error);
      throw error;
    }
  },

  /**
   * Get detailed digital twin data
   */
  getById: async (twinId: string) => {
    try {
      const response = await apiClient.get(`/api/v1/digital-twins/${twinId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch digital twin:', error);
      throw error;
    }
  },

  /**
   * Run simulation scenario
   */
  simulate: async (
    twinId: string,
    scenario: {
      scenario: string;
      duration: number;
      parameters?: Record<string, any>;
    }
  ) => {
    try {
      const response = await apiClient.post(
        `/api/v1/digital-twins/${twinId}/simulate`,
        scenario
      );
      return response.data;
    } catch (error) {
      console.error('Failed to run simulation:', error);
      throw error;
    }
  },
};

// ============================================================================
// AGENTS
// ============================================================================

export const agentsApi = {
  /**
   * List all operational agents
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/api/v1/agents');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      throw error;
    }
  },

  /**
   * Get AI recommendations from agent
   */
  getRecommendations: async (agentId: string) => {
    try {
      const response = await apiClient.get(
        `/api/v1/agents/${agentId}/recommendations`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      throw error;
    }
  },

  /**
   * Execute agent action
   */
  executeAction: async (
    agentId: string,
    action: {
      action: string;
      parameters?: Record<string, any>;
    }
  ) => {
    try {
      const response = await apiClient.post(
        `/api/v1/agents/${agentId}/execute`,
        action
      );
      return response.data;
    } catch (error) {
      console.error('Failed to execute agent action:', error);
      throw error;
    }
  },
};

// ============================================================================
// GOVERNANCE & COMPLIANCE
// ============================================================================

export const governanceApi = {
  /**
   * Get compliance status
   */
  getComplianceStatus: async () => {
    try {
      const response = await apiClient.get('/api/v1/governance/compliance');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch compliance status:', error);
      throw error;
    }
  },

  /**
   * Get audit logs
   */
  getAuditLogs: async (options?: {
    action?: string;
    actor?: string;
    resource?: string;
    limit?: number;
  }) => {
    try {
      const response = await apiClient.get('/api/v1/governance/audit-logs', {
        params: options,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      throw error;
    }
  },
};

// ============================================================================
// AUTHENTICATION (Phase 4)
// ============================================================================

export const authApi = {
  /**
   * User login
   */
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/v1/auth/login', {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await apiClient.post('/api/v1/auth/refresh', {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },

  /**
   * User logout
   */
  logout: async () => {
    try {
      await apiClient.post('/api/v1/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
};

// ============================================================================
// LEADS
// ============================================================================

export const leadsApi = {
  /**
   * Submit contact form
   */
  submitContactForm: async (formData: {
    nombre: string;
    email: string;
    empresa: string;
    telefono: string;
    unidad: string;
    mensaje: string;
  }) => {
    try {
      const response = await apiClient.post('/api/v1/leads', formData);
      return response.data;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  },
};

export default apiClient;
