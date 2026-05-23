# Backend Integration Guide - FastAPI

## Overview

This document outlines the integration strategy for connecting the NEXERGY AI frontend with a FastAPI backend for real operational data, AI orchestration, and digital twin simulation.

## Architecture

### Current State (Phase 1-2)
```
Frontend (React) → Mock Data Generators → UI Components
```

### Future State (Phase 3+)
```
Frontend (React) → API Client → FastAPI Backend → Databases/AI Services
```

## API Structure

### Base URL
```
Production: https://api.nexergy.ai
Development: http://localhost:8000
```

### API Versioning
All endpoints use `/api/v1/` prefix for future compatibility.

## Endpoint Categories

### 1. Operational Metrics

#### GET `/api/v1/metrics`
Fetch current operational metrics.

**Response:**
```json
{
  "productionEfficiency": {
    "value": 92,
    "unit": "%",
    "trend": "up",
    "status": "healthy"
  },
  "equipmentUptime": {
    "value": 98.5,
    "unit": "%",
    "trend": "stable",
    "status": "healthy"
  }
}
```

#### GET `/api/v1/metrics/history?interval=1h&limit=24`
Fetch historical metrics for charting.

**Query Parameters:**
- `interval`: Time interval (1m, 5m, 1h, 1d)
- `limit`: Number of data points
- `startTime`: ISO timestamp
- `endTime`: ISO timestamp

### 2. Anomalies & Alerts

#### GET `/api/v1/anomalies`
Fetch active anomalies.

**Response:**
```json
{
  "items": [
    {
      "id": "anom-001",
      "title": "Elevated Vibration Levels",
      "severity": "warning",
      "affectedSystem": "Pump System A",
      "confidence": 87,
      "recommendedAction": "Schedule maintenance"
    }
  ],
  "total": 1
}
```

#### POST `/api/v1/anomalies/{id}/acknowledge`
Acknowledge an anomaly.

**Request:**
```json
{
  "acknowledgedBy": "user-123",
  "notes": "Scheduled for maintenance"
}
```

#### GET `/api/v1/alerts`
Fetch all alerts with filtering.

**Query Parameters:**
- `severity`: critical, warning, info
- `status`: active, acknowledged, resolved
- `limit`: 10-100

### 3. Digital Twins

#### GET `/api/v1/digital-twins`
List all digital twins.

**Response:**
```json
{
  "items": [
    {
      "id": "dt-001",
      "name": "Plant Alpha",
      "type": "Manufacturing Facility",
      "status": "operational",
      "efficiency": 92
    }
  ]
}
```

#### GET `/api/v1/digital-twins/{id}`
Get detailed digital twin data.

**Response:**
```json
{
  "id": "dt-001",
  "name": "Plant Alpha",
  "parameters": [
    {
      "name": "Temperature",
      "value": 55,
      "unit": "°C",
      "status": "normal"
    }
  ],
  "lastSync": "2026-05-23T12:35:00Z"
}
```

#### POST `/api/v1/digital-twins/{id}/simulate`
Run simulation scenario.

**Request:**
```json
{
  "scenario": "peak-load",
  "duration": 3600,
  "parameters": {
    "temperature": 60,
    "pressure": 10
  }
}
```

**Response:**
```json
{
  "scenarioId": "sim-001",
  "outcome": "System stable under peak load",
  "metrics": {
    "efficiency": 89,
    "energy_consumption": 1450
  },
  "recommendations": ["Adjust cooling system"]
}
```

### 4. AI Agents

#### GET `/api/v1/agents`
List all operational agents.

**Response:**
```json
{
  "items": [
    {
      "id": "agent-pm",
      "name": "Predictive Maintenance Agent",
      "type": "predictive-maintenance",
      "status": "active"
    }
  ]
}
```

#### GET `/api/v1/agents/{id}/recommendations`
Get AI recommendations from agent.

**Response:**
```json
{
  "items": [
    {
      "id": "rec-001",
      "title": "Optimize Pump Schedule",
      "impact": "high",
      "confidence": 92,
      "estimatedBenefit": "$15,000/month"
    }
  ]
}
```

#### POST `/api/v1/agents/{id}/execute`
Execute agent action.

**Request:**
```json
{
  "action": "schedule-maintenance",
  "parameters": {
    "system": "Pump A",
    "date": "2026-05-25"
  }
}
```

### 5. Governance & Compliance

#### GET `/api/v1/governance/compliance`
Get compliance status.

**Response:**
```json
{
  "policies": [
    {
      "id": "policy-iso42001",
      "name": "ISO 42001",
      "status": "compliant",
      "lastAudit": "2026-05-20"
    }
  ]
}
```

#### GET `/api/v1/governance/audit-logs`
Fetch audit logs.

**Query Parameters:**
- `action`: Filter by action type
- `actor`: Filter by user
- `resource`: Filter by resource
- `limit`: 10-1000

### 6. Authentication (Phase 4)

#### POST `/api/v1/auth/login`
User login.

**Request:**
```json
{
  "email": "user@nexergy.ai",
  "password": "secure-password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

#### POST `/api/v1/auth/refresh`
Refresh access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

## Frontend Integration

### API Client Setup

```typescript
// client/src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Using API in Components

```typescript
// client/src/hooks/useOperationalData.ts
import apiClient from '@/lib/api';

export function useOperationalData() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/v1/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    fetchData();
  }, []);

  return { metrics };
}
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid query parameters",
    "details": {
      "field": "limit",
      "reason": "Must be between 10 and 100"
    }
  },
  "timestamp": "2026-05-23T12:35:00Z"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

## WebSocket Integration (Real-time)

### Connection

```typescript
const ws = new WebSocket('wss://api.nexergy.ai/ws/metrics');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update UI with real-time metrics
};
```

### Message Format

```json
{
  "type": "metrics-update",
  "data": {
    "productionEfficiency": 92,
    "timestamp": "2026-05-23T12:35:00Z"
  }
}
```

## Rate Limiting

- **Default:** 100 requests per minute
- **Authentication:** 1000 requests per minute
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Caching Strategy

### Browser Cache
```typescript
const response = await apiClient.get('/api/v1/metrics', {
  headers: {
    'Cache-Control': 'max-age=300' // 5 minutes
  }
});
```

### API Response Caching
- Metrics: 1 minute
- Anomalies: 30 seconds
- Digital Twins: 5 minutes
- Audit Logs: No cache

## Security

### HTTPS Only
All API endpoints require HTTPS in production.

### CORS
```
Allowed Origins: https://nexergy.ai, https://*.nexergy.ai
Allowed Methods: GET, POST, PUT, DELETE
Allowed Headers: Content-Type, Authorization
```

### Rate Limiting
Implemented to prevent abuse and DDoS attacks.

### Input Validation
All inputs are validated and sanitized on the backend.

## Testing

### Mock API Responses
```typescript
// For development/testing
if (process.env.VITE_ENVIRONMENT === 'development') {
  // Use mock data generators
  const metrics = generateMockMetrics();
}
```

### API Testing
```bash
# Test endpoints with curl
curl -H "Authorization: Bearer TOKEN" \
  https://api.nexergy.ai/api/v1/metrics
```

## Migration Plan

### Phase 3 Implementation
1. Set up FastAPI backend
2. Implement core endpoints (metrics, anomalies, digital twins)
3. Integrate with frontend hooks
4. Add authentication

### Phase 4 Enhancement
1. Add advanced endpoints (agents, governance)
2. Implement WebSocket real-time updates
3. Add caching layer
4. Performance optimization

## Backend Technology Stack

- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL
- **Cache:** Redis
- **Message Queue:** RabbitMQ/Celery
- **AI Framework:** LangChain / LlamaIndex
- **Deployment:** Docker + Kubernetes

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [API Design Best Practices](https://restfulapi.net)
- [OpenAPI Specification](https://swagger.io/specification)

---

**Last Updated:** May 23, 2026
**Version:** 1.0
**Status:** Ready for Phase 3 Implementation
