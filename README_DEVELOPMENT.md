# OPTINEX AI - Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ (includes pnpm)
- Git
- Code editor (VSCode recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/Optinex-ai/optinex-ai-web.git
cd optinex-ai-web

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# http://localhost:3000
```

## Project Structure

```
optinex-ai-web/
├── client/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── data/           # Data and mock data
│   │   ├── types/          # TypeScript types
│   │   ├── constants/      # Configuration constants
│   │   ├── lib/            # Utility functions
│   │   ├── styles/         # Global styles
│   │   └── App.tsx         # Root component
│   ├── index.html
│   └── public/
├── docs/                   # Documentation
├── server/                 # Backend placeholder
└── package.json
```

## Available Commands

```bash
# Development
pnpm dev              # Start dev server with HMR
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier

# Testing (future)
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
```

## Key Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with platform overview |
| `/dashboard` | Dashboard | Operational intelligence dashboard |
| `/governance` | Governance | Compliance and security framework |

## Component Architecture

### Page Components
Located in `client/src/pages/`, these are top-level route components.

```tsx
// Example: Dashboard.tsx
import { useOperationalData } from '@/hooks/useOperationalData';
import { KPICard } from '@/components/dashboard/KPICard';

export default function Dashboard() {
  const { metrics, loading } = useOperationalData();
  return (
    <div>
      {metrics && Object.values(metrics).map(kpi => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
```

### Custom Hooks
Located in `client/src/hooks/`, these manage data fetching and state.

```tsx
// Example: useOperationalData.ts
export function useOperationalData(realTime = true) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return { metrics, loading, refetch };
}
```

### Reusable Components
Located in `client/src/components/`, organized by domain.

```tsx
// Example: KPICard.tsx
interface KPICardProps {
  kpi: KPI;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, onClick }) => {
  return (
    <div className="p-6 rounded-lg border-2">
      {/* Component content */}
    </div>
  );
};
```

## Data Management

### Mock Data (Current)
Mock data is generated in `client/src/data/mock/generators.ts`:

```tsx
import { generateMockMetrics, generateMockAnomalies } from '@/data/mock/generators';

const metrics = generateMockMetrics();
const anomalies = generateMockAnomalies();
```

### Real Data (Phase 3)
Will be integrated via API client:

```tsx
// Future: client/src/lib/api.ts
const response = await apiClient.get('/api/v1/metrics');
```

## Styling System

### Tailwind CSS
All styling uses Tailwind CSS 4 with custom theme tokens defined in `client/src/index.css`.

```tsx
// Example: Using theme colors
<div className="bg-primary text-primary-foreground">
  Primary color with foreground
</div>

// Example: Dark mode
<div className="dark:bg-gray-900 dark:text-white">
  Responsive to dark mode
</div>
```

### Theme Colors
- **Primary:** `#0F3A7D` (Deep Blue)
- **Secondary:** `#00A86B` (Emerald Green)
- **Accent:** `#00D9FF` (Cyan)

## Type Safety

All components and data structures are fully typed with TypeScript.

### Global Types
Located in `client/src/types/index.ts`:

```tsx
// Example: KPI type
export interface KPI {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
}
```

### Using Types
```tsx
import { KPI, Anomaly, OperationalMetrics } from '@/types';

const handleKPI = (kpi: KPI) => {
  console.log(`${kpi.label}: ${kpi.value}${kpi.unit}`);
};
```

## Configuration

### Site Configuration
Located in `client/src/constants/config.ts`:

```tsx
export const siteConfig = {
  name: 'OPTINEX AI',
  apiUrl: process.env.VITE_API_URL,
  features: {
    dashboard: true,
    agents: true,
    // ...
  },
};
```

### Environment Variables
Create `.env.local`:

```env
VITE_API_URL=https://api.optinex.ai
VITE_ENVIRONMENT=development
```

## Common Patterns

### Fetching Data with Hooks
```tsx
import { useOperationalData } from '@/hooks/useOperationalData';

function MyComponent() {
  const { metrics, loading, error, refetch } = useOperationalData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render metrics */}</div>;
}
```

### Creating a New Page
```tsx
// client/src/pages/MyPage.tsx
import React from 'react';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Page content */}
    </div>
  );
}
```

### Adding a New Route
```tsx
// client/src/App.tsx
import MyPage from './pages/MyPage';

function Router() {
  return (
    <Switch>
      <Route path={"/my-page"} component={MyPage} />
      {/* Other routes */}
    </Switch>
  );
}
```

## Performance Optimization

### Code Splitting
Routes are automatically code-split by Vite.

### Component Memoization
```tsx
import { memo } from 'react';

const KPICard = memo(({ kpi }) => {
  return <div>{/* Component */}</div>;
});
```

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

## Testing (Future)

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm test:e2e
```

## Deployment

### Vercel
The project is optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel deploy
```

### Environment Variables
Set in Vercel dashboard:
- `VITE_API_URL`
- `VITE_ENVIRONMENT`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Type Errors
```bash
# Check types
pnpm check

# Fix TypeScript errors
pnpm format
```

## Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Format with Prettier
- Write meaningful commit messages

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance
```

### Pull Request Process
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/my-feature`
4. Create Pull Request with description

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Project Architecture](./docs/PROJECT_ARCHITECTURE.md)
- [Development Roadmap](./docs/ROADMAP.md)

## Support

For questions or issues:
1. Check the documentation in `/docs`
2. Review existing issues on GitHub
3. Create a new issue with detailed description

---

**Last Updated:** May 23, 2026
**Version:** 1.0
**Maintainer:** Optinex AI Development Team
