# NEXERGY AI - Project Architecture

## Overview

**NEXERGY AI** is an AI-native operational infrastructure platform designed for industrial and energy systems. This document outlines the technical architecture, design decisions, and scalability strategy.

### Core Mission
> "Conectamos estrategia y operación para ejecutar el futuro, hoy."

Connect business strategy with operational data through AI agents and digital twins to optimize real-time decisions and assist operational execution.

---

## Architecture Layers

### 1. **Presentation Layer** (Frontend)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 4 + Framer Motion
- **State Management:** React Context + Custom Hooks
- **Routing:** Wouter (lightweight client-side routing)
- **UI Components:** shadcn/ui + Custom Enterprise Components

**Key Characteristics:**
- Dark/Light theme support
- Responsive design (mobile-first)
- Accessibility-first approach (WCAG 2.1)
- Performance optimized (code splitting, lazy loading)

### 2. **Business Logic Layer** (Hooks & Utilities)
- Custom React hooks for data fetching and state management
- Utility functions for calculations and transformations
- Type-safe data handling with TypeScript
- Configuration management

### 3. **Data Layer** (Mock → Real)
- **Current:** Mock data structures for demonstration
- **Future:** Integration with FastAPI backend
- **Database:** PostgreSQL via Supabase (prepared)
- **Real-time:** WebSocket support for live updates

### 4. **AI & Orchestration Layer** (Backend Ready)
- **Framework:** FastAPI (Python)
- **AI Agents:** Agent orchestration framework
- **Digital Twins:** Simulation engine
- **ML Models:** Model serving and inference
- **Governance:** ISO 42001 compliance layer

### 5. **Infrastructure Layer**
- **Deployment:** Vercel (Frontend)
- **Backend:** Cloud-ready (AWS/GCP/Azure)
- **Database:** Supabase PostgreSQL
- **Monitoring:** Observability stack
- **Security:** OAuth2, JWT, API authentication

---

## Directory Structure

```
nexergy-ai-web/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   └── layout.tsx          # Root layout
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── Platform.tsx        # Platform visualization
│   │   │   ├── Dashboard.tsx       # Operational dashboard
│   │   │   ├── Governance.tsx      # Compliance & governance
│   │   │   ├── Industries.tsx      # Target industries
│   │   │   ├── About.tsx           # Company info
│   │   │   └── Contact.tsx         # Lead capture
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── platform/
│   │   │   │   ├── ArchitectureVisualization.tsx
│   │   │   │   ├── DataFlowDiagram.tsx
│   │   │   │   └── LayerExplainer.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── KPICard.tsx
│   │   │   │   ├── AnomalyAlert.tsx
│   │   │   │   ├── OperationalMetrics.tsx
│   │   │   │   └── DigitalTwinPreview.tsx
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── BusinessUnitsGrid.tsx
│   │   │   │   ├── GovernanceStack.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   └── ui/
│   │   │       └── [shadcn components]
│   │   ├── lib/
│   │   │   ├── utils.ts            # Utility functions
│   │   │   ├── api.ts              # API client
│   │   │   └── validators.ts       # Form validation
│   │   ├── hooks/
│   │   │   ├── useOperationalData.ts
│   │   │   ├── useDashboardMetrics.ts
│   │   │   └── useTheme.ts
│   │   ├── data/
│   │   │   ├── mock/
│   │   │   │   ├── kpis.ts
│   │   │   │   ├── anomalies.ts
│   │   │   │   └── industrialData.ts
│   │   │   └── schemas.ts          # Data schemas
│   │   ├── types/
│   │   │   ├── index.ts            # Global types
│   │   │   ├── platform.ts
│   │   │   ├── dashboard.ts
│   │   │   └── business.ts
│   │   ├── constants/
│   │   │   ├── config.ts
│   │   │   ├── businessUnits.ts
│   │   │   └── industries.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── config/
│   │   │   └── site.config.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── public/
├── server/
│   ├── index.ts                    # Express server (placeholder)
│   └── [future FastAPI integration]
├── shared/
│   └── types.ts                    # Shared types
├── docs/
│   ├── PROJECT_ARCHITECTURE.md     # This file
│   ├── ROADMAP.md
│   ├── COMPONENT_LIBRARY.md
│   └── API_INTEGRATION.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Component Architecture

### Design System
- **Tokens:** Centralized color, typography, spacing tokens
- **Components:** Reusable, typed, documented
- **Patterns:** Established patterns for common UI scenarios
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── MainContent
│   └── Footer
├── Pages
│   ├── Home
│   │   ├── HeroSection
│   │   ├── ProblemSolutionResults
│   │   ├── PlatformVisualization
│   │   ├── BusinessUnitsGrid
│   │   ├── GovernanceStack
│   │   └── CTASection
│   ├── Dashboard
│   │   ├── KPIGrid
│   │   ├── AnomalyAlerts
│   │   ├── OperationalMetrics
│   │   └── DigitalTwinPreview
│   └── [Other Pages]
└── Modals/Overlays
```

---

## Data Flow

### Current State (Mock Data)
```
MockData → Hooks → Components → UI
```

### Future State (Real Backend)
```
User Action → API Client → FastAPI Backend → Database
                    ↓
            AI Orchestration Layer
                    ↓
            Response → State Management → Components → UI
```

### Real-time Updates
```
WebSocket Connection → Event Listener → State Update → UI Refresh
```

---

## Routing Strategy

### Page Routes
- `/` - Home (Landing page)
- `/platform` - Platform architecture visualization
- `/dashboard` - Operational intelligence dashboard
- `/governance` - Compliance and governance
- `/industries` - Target industries
- `/about` - Company information
- `/contact` - Lead capture form

### Dynamic Routes (Future)
- `/business-units/:unit` - Detailed unit pages
- `/case-studies/:id` - Case study details
- `/blog/:slug` - Blog articles
- `/admin/*` - Admin dashboard

---

## State Management Strategy

### Context API Usage
- **ThemeContext:** Dark/light theme state
- **AuthContext:** User authentication state (future)
- **DashboardContext:** Operational metrics state

### Custom Hooks
- `useOperationalData()` - Fetch and cache operational data
- `useDashboardMetrics()` - Real-time metrics
- `useTheme()` - Theme switching
- `usePersistFn()` - Persistent function references

### Data Fetching
- **Current:** Mock data with simulated delays
- **Future:** React Query for server state management

---

## Performance Optimization

### Code Splitting
- Route-based code splitting with React.lazy()
- Component-level code splitting for heavy components
- Vite's automatic chunk splitting

### Asset Optimization
- Image optimization with next-gen formats
- Lazy loading for images and components
- CSS minification and tree-shaking

### Caching Strategy
- Browser caching for static assets
- API response caching with React Query
- Service Worker support (future)

---

## Scalability Considerations

### Horizontal Scaling
- Stateless components for easy replication
- API-driven architecture for backend scaling
- CDN distribution for global reach

### Vertical Scaling
- Efficient component rendering with React.memo
- Virtualization for large lists
- Progressive data loading

### Database Scaling
- PostgreSQL with Supabase for managed scaling
- Connection pooling
- Query optimization

---

## Security Architecture

### Frontend Security
- XSS prevention with React's built-in escaping
- CSRF protection with token validation
- Content Security Policy headers
- Secure cookie handling

### Backend Security (Future)
- OAuth2 authentication
- JWT token-based authorization
- Rate limiting and DDoS protection
- Input validation and sanitization
- Encryption at rest and in transit

### Data Privacy
- GDPR compliance ready
- Data encryption
- Audit logging
- User consent management

---

## Integration Points

### AI Orchestration (Future)
```typescript
// Example: AI Agent Integration
const aiResponse = await orchestrateAgent({
  agentType: 'predictive-maintenance',
  inputData: operationalMetrics,
  context: industrialContext
});
```

### Digital Twin Simulation (Future)
```typescript
// Example: Digital Twin Interaction
const simulationResult = await simulateScenario({
  twinId: 'plant-001',
  scenario: 'peak-load',
  duration: 3600
});
```

### FastAPI Backend Integration (Future)
```typescript
// Example: API Call Pattern
const response = await apiClient.post('/api/v1/predictions', {
  data: operationalData,
  model: 'predictive-maintenance-v2'
});
```

---

## Development Workflow

### Setup
```bash
pnpm install
pnpm dev
```

### Build
```bash
pnpm build
pnpm preview
```

### Type Checking
```bash
pnpm check
```

### Code Quality
```bash
pnpm format
pnpm lint
```

---

## Deployment Strategy

### Vercel Deployment
- Automatic deployments on push to `main`
- Preview deployments for pull requests
- Environment variables for API endpoints
- Edge functions for API proxying

### Environment Configuration
```env
VITE_API_URL=https://api.nexergy.ai
VITE_ENVIRONMENT=production
VITE_ANALYTICS_ID=xxx
```

---

## Monitoring & Analytics

### Performance Monitoring
- Web Vitals tracking
- Error tracking with Sentry
- Performance profiling

### User Analytics
- Event tracking
- Conversion funnel analysis
- User journey mapping

### Operational Monitoring
- API response times
- Database query performance
- Infrastructure health

---

## Future Evolution

### Phase 2: Dashboard & Simulation
- Operational intelligence dashboard
- Digital twin visualizations
- Mock AI outputs
- Real-time metrics

### Phase 3: AI Integration
- Agent workflow execution
- Model inference integration
- Orchestration layer
- Advanced analytics

### Phase 4: Enterprise Features
- Authentication & authorization
- Multi-tenant support
- Advanced governance
- Custom integrations

---

## Contributing Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

### Component Development
- Props interface definition
- Default props
- Storybook stories (future)
- Unit tests (future)

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks
```

---

## Troubleshooting

### Common Issues
- **Build errors:** Clear node_modules and reinstall
- **Type errors:** Run `pnpm check` to validate
- **Performance:** Use React DevTools Profiler

### Debug Mode
```typescript
// Enable debug logging
localStorage.setItem('DEBUG_MODE', 'true');
```

---

## References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [shadcn/ui](https://ui.shadcn.com)

---

**Last Updated:** May 23, 2026
**Version:** 1.0
**Maintainer:** Nexergy AI Development Team
