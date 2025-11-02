# Architecture Overview

## System Design

The Multi-AI Dashboard is built as a microservices architecture with the following components:

### 1. Frontend (Next.js)

The frontend is a modern React application built with Next.js 14's App Router:

- **Pages**: Server-side rendered pages with client-side interactivity
- **Components**: Reusable UI components with Tailwind CSS
- **State Management**: React hooks for local state management
- **Real-time Communication**: Socket.IO client for WebSocket connections

### 2. Backend Orchestrator (Node.js)

The orchestrator serves as the central hub for coordinating AI provider interactions:

- **Express Server**: REST API endpoints for health checks and provider status
- **Socket.IO Server**: WebSocket server for real-time bidirectional communication
- **Provider Orchestration**: Routes messages to appropriate AI providers
- **Error Handling**: Centralized error handling and logging

### 3. Provider Adapters

Each AI provider has its own adapter implementing a common interface:

```typescript
interface AIProvider {
  sendMessage(message: string): Promise<string>
  getName(): string
}
```

**Providers:**
- **GPTProvider**: OpenAI GPT integration
- **ClaudeProvider**: Anthropic Claude integration
- **GeminiProvider**: Google Gemini integration
- **CopilotProvider**: GitHub Copilot integration
- **TIAWorksProvider**: TIA Works integration

### 4. Shared Packages

#### @multi-ai-dashboard/shared
- Type definitions for messages, providers, and API contracts
- Utility functions for formatting and data manipulation

#### @multi-ai-dashboard/providers
- AI provider implementations
- Base provider class with common functionality
- Provider-specific configurations

## Data Flow

1. **User Input**: User types a message in the web interface
2. **Provider Selection**: User selects which AI providers to query
3. **WebSocket Emission**: Frontend emits message via Socket.IO
4. **Orchestrator Processing**: Backend receives message and routes to providers
5. **Provider Execution**: Each selected provider processes the message
6. **Response Streaming**: Responses are sent back via WebSocket
7. **UI Update**: Frontend displays responses in real-time

## Communication Protocol

### WebSocket Events

**Client → Server:**
```typescript
{
  event: 'chat:message',
  data: {
    message: string,
    providers: ProviderId[]
  }
}
```

**Server → Client:**
```typescript
{
  event: 'chat:response',
  data: {
    provider: ProviderId,
    message: string,
    timestamp: number
  }
}
```

**Server → Client (Error):**
```typescript
{
  event: 'chat:error',
  data: {
    error: string
  }
}
```

## Deployment Architecture

### Development
- Frontend: localhost:3000
- Backend: localhost:3001
- Direct connection between services

### Production (Docker)
- Services run in isolated containers
- Internal network for service communication
- Exposed ports: 3000 (web), 3001 (orchestrator)

## Security Considerations

1. **API Keys**: Stored as environment variables, never committed
2. **CORS**: Configured to allow only trusted origins
3. **Input Validation**: All user inputs should be validated (to be implemented)
4. **Rate Limiting**: Should be implemented for API endpoints
5. **Authentication**: Should be added for production use

## Scalability

The current architecture supports horizontal scaling:

- **Frontend**: Can be deployed to CDN/edge networks
- **Orchestrator**: Can be scaled with load balancer
- **Providers**: Independent modules that can be scaled separately

## Technology Stack

- **TypeScript**: Type-safe development across all packages
- **Next.js 14**: React framework with server components
- **Tailwind CSS**: Utility-first CSS framework
- **Express**: Minimal web framework for Node.js
- **Socket.IO**: Real-time bidirectional communication
- **Docker**: Containerization and deployment
