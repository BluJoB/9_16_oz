# Development Guide

## Development Setup

### Initial Setup

1. Install Node.js 18 or higher
2. Clone the repository
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure API keys

### Workspace Structure

This project uses npm workspaces for monorepo management. Each package/app is independent but can reference others.

### Development Workflow

#### Start Development Servers

```bash
# Start all services
npm run dev

# Or start individual services
cd apps/web && npm run dev
cd apps/orchestrator && npm run dev
```

#### Build Packages

Build order matters due to dependencies:

```bash
# Build shared package first
npm run build --workspace=@multi-ai-dashboard/shared

# Then build providers
npm run build --workspace=@multi-ai-dashboard/providers

# Then build apps
npm run build --workspace=@multi-ai-dashboard/orchestrator
npm run build --workspace=@multi-ai-dashboard/web
```

Or build everything:
```bash
npm run build
```

## Adding a New AI Provider

1. Create a new file in `packages/providers/src/`:

```typescript
// packages/providers/src/newprovider.ts
import { BaseProvider } from './base'

export class NewProvider extends BaseProvider {
  getName(): string {
    return 'NewProvider'
  }

  protected getApiKey(): string | undefined {
    return process.env.NEW_PROVIDER_API_KEY
  }

  async sendMessage(message: string): Promise<string> {
    // Implement your provider logic here
    return `NewProvider response to: ${message}`
  }
}
```

2. Export it in `packages/providers/src/index.ts`:

```typescript
export { NewProvider } from './newprovider'
```

3. Add it to the orchestrator in `apps/orchestrator/src/orchestrator.ts`:

```typescript
import { NewProvider } from '@multi-ai-dashboard/providers'

constructor() {
  this.providers = new Map([
    // ... existing providers
    ['newprovider', new NewProvider()],
  ])
}
```

4. Update the frontend types in `packages/shared/src/types.ts`:

```typescript
export type ProviderId = 'gpt' | 'claude' | 'gemini' | 'copilot' | 'tia' | 'newprovider'
```

5. Add UI representation in `apps/web/src/components/ChatInterface.tsx`:

```typescript
const providers = [
  // ... existing providers
  { name: 'New Provider', id: 'newprovider', color: 'bg-purple-500' },
]
```

## Code Style

### TypeScript

- Use strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type

### React

- Use functional components with hooks
- Prefer named exports
- Keep components focused and small
- Use TypeScript for prop types

### CSS

- Use Tailwind utility classes
- Create custom classes only when necessary
- Follow mobile-first responsive design

## Testing

### Unit Tests (To Be Implemented)

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test --workspace=@multi-ai-dashboard/providers
```

### Integration Tests (To Be Implemented)

Test the full flow from frontend to backend:

1. User sends a message
2. Orchestrator receives it
3. Providers are called
4. Responses are returned

## Debugging

### Frontend Debugging

1. Use React Developer Tools
2. Use browser DevTools Network tab for API calls
3. Check WebSocket messages in Network tab

### Backend Debugging

1. Add `debugger` statements or `console.log`
2. Use Node.js inspector:

```bash
cd apps/orchestrator
node --inspect dist/index.js
```

3. Check logs for errors

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```env
NODE_ENV=development
ORCHESTRATOR_PORT=3001
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_API_KEY=...
GITHUB_COPILOT_TOKEN=...
TIA_WORKS_API_KEY=...
```

## Common Issues

### Port Already in Use

If ports 3000 or 3001 are in use:

```bash
# Find process using port
lsof -ti:3000
lsof -ti:3001

# Kill process
kill -9 <PID>
```

### Module Not Found

If you see "Cannot find module" errors:

```bash
# Clean and reinstall
npm run clean
npm install
npm run build
```

### WebSocket Connection Failed

- Ensure the orchestrator is running on port 3001
- Check CORS configuration in orchestrator
- Verify `NEXT_PUBLIC_API_URL` is set correctly

## Performance Tips

1. **Build Only What Changed**: Build specific workspaces instead of all
2. **Use Development Mode**: Hot reloading is faster than rebuilding
3. **Optimize Imports**: Import only what you need from packages
4. **TypeScript**: Use incremental compilation

## Git Workflow

1. Create a feature branch
2. Make changes
3. Test locally
4. Commit with descriptive messages
5. Push and create a pull request

## Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] No console.log statements in production code
- [ ] Types are properly defined
- [ ] Error handling is implemented
- [ ] Documentation is updated
- [ ] Tests are added (when test infrastructure exists)
