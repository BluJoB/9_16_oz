# Multi-AI Dashboard

A real-time chat interface that allows simultaneous interaction with multiple AI providers: GPT, Claude, Gemini, GitHub Copilot, and TIA Works.

## Architecture

This is a monorepo built with:

### Frontend (`/apps/web`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO client

### Backend (`/apps/orchestrator`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-time**: Socket.IO server
- **Architecture**: Modular provider adapters

### Packages
- **`/packages/providers`**: Modular AI provider implementations
- **`/packages/shared`**: Shared types and utilities

## Project Structure

```
multi-ai-dashboard/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/        # App router pages
│   │   │   └── components/ # React components
│   │   ├── Dockerfile
│   │   └── package.json
│   └── orchestrator/        # Node.js backend
│       ├── src/
│       ├── Dockerfile
│       └── package.json
├── packages/
│   ├── providers/           # AI provider adapters
│   │   └── src/
│   │       ├── base.ts
│   │       ├── gpt.ts
│   │       ├── claude.ts
│   │       ├── gemini.ts
│   │       ├── copilot.ts
│   │       └── tia.ts
│   └── shared/              # Shared utilities
│       └── src/
│           ├── types.ts
│           └── utils.ts
├── docs/                    # Documentation
├── docker-compose.yml       # Docker orchestration
├── .env.example            # Environment variables template
└── package.json            # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BluJoB/9_16_oz.git
cd 9_16_oz
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your API keys in `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
GITHUB_COPILOT_TOKEN=your_github_copilot_token_here
TIA_WORKS_API_KEY=your_tia_works_api_key_here
```

### Development

Run all services in development mode:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Building

Build all packages and apps:

```bash
npm run build
```

### Docker

Build and run with Docker Compose:

```bash
docker-compose up --build
```

## Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages and applications
- `npm run test` - Run tests across all workspaces
- `npm run lint` - Lint all packages and applications
- `npm run clean` - Clean all build artifacts and dependencies

## Features (Sprint 0)

- ✅ Monorepo structure with npm workspaces
- ✅ Next.js frontend with TypeScript and Tailwind CSS
- ✅ Node.js backend with Express and Socket.IO
- ✅ Modular AI provider architecture
- ✅ Shared type definitions and utilities
- ✅ Docker configuration for containerization
- ✅ Environment variable management
- ✅ Real-time chat UI foundation

## Next Steps

After Sprint 0, the following features should be implemented:

1. **Provider Integration**: Implement actual API calls to AI providers
2. **Authentication**: Add user authentication and session management
3. **Message History**: Persist chat history in a database
4. **Streaming Responses**: Implement real-time streaming from AI providers
5. **Error Handling**: Enhanced error handling and retry logic
6. **Testing**: Add unit and integration tests
7. **CI/CD**: Set up continuous integration and deployment pipelines

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

See [LICENSE](./LICENSE) for license information.
