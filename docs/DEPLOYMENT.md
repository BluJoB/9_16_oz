# Deployment Guide

## Docker Deployment

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/BluJoB/9_16_oz.git
cd 9_16_oz
```

2. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Build and start services**:
```bash
docker-compose up --build
```

4. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/health

### Production Configuration

For production deployment, update the following:

1. **Environment Variables**:
   - Set production API keys
   - Update `NODE_ENV=production`
   - Configure proper CORS origins

2. **Security**:
   - Enable HTTPS
   - Add rate limiting
   - Implement authentication
   - Use secrets management (e.g., Docker secrets, AWS Secrets Manager)

3. **Monitoring**:
   - Add logging solution (e.g., ELK stack)
   - Set up health checks
   - Configure alerts

### Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up --build -d

# Remove all containers and volumes
docker-compose down -v
```

## Manual Deployment

### Prerequisites

- Node.js 18+
- npm 9+
- Process manager (e.g., PM2)

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Build all packages**:
```bash
npm run build
```

3. **Start services**:
```bash
# Start orchestrator
cd apps/orchestrator
node dist/index.js &

# Start web frontend
cd apps/web
npm start &
```

### Using PM2

1. **Install PM2**:
```bash
npm install -g pm2
```

2. **Create ecosystem file** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [
    {
      name: 'orchestrator',
      cwd: './apps/orchestrator',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        ORCHESTRATOR_PORT: 3001,
      },
    },
    {
      name: 'web',
      cwd: './apps/web',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
```

3. **Start with PM2**:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Cloud Deployment

### AWS

#### Using ECS (Elastic Container Service)

1. **Push images to ECR**:
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t multi-ai-web -f apps/web/Dockerfile .
docker tag multi-ai-web:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/multi-ai-web:latest

# Push
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/multi-ai-web:latest
```

2. **Create ECS task definitions**
3. **Deploy to ECS service**

#### Using EC2

1. **Launch EC2 instance**
2. **Install Docker and Docker Compose**
3. **Clone repository**
4. **Run docker-compose**

### Google Cloud Platform

#### Using Cloud Run

1. **Build and push to Container Registry**:
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/multi-ai-web apps/web
gcloud builds submit --tag gcr.io/PROJECT-ID/multi-ai-orchestrator apps/orchestrator
```

2. **Deploy to Cloud Run**:
```bash
gcloud run deploy multi-ai-web --image gcr.io/PROJECT-ID/multi-ai-web
gcloud run deploy multi-ai-orchestrator --image gcr.io/PROJECT-ID/multi-ai-orchestrator
```

### Azure

#### Using Azure Container Instances

1. **Login to Azure**:
```bash
az login
az acr login --name <registry-name>
```

2. **Build and push**:
```bash
az acr build --registry <registry-name> --image multi-ai-web:latest -f apps/web/Dockerfile .
```

3. **Create container instance**:
```bash
az container create --resource-group myResourceGroup --name multi-ai-web --image <registry-name>.azurecr.io/multi-ai-web:latest
```

### Vercel (Frontend Only)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd apps/web
vercel --prod
```

### Heroku

1. **Install Heroku CLI**
2. **Create apps**:
```bash
heroku create multi-ai-orchestrator
heroku create multi-ai-web
```

3. **Deploy**:
```bash
git push heroku main
```

## Environment Configuration

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
ORCHESTRATOR_PORT=3001
```

### Staging
```env
NODE_ENV=staging
NEXT_PUBLIC_API_URL=https://api-staging.example.com
ORCHESTRATOR_PORT=3001
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
ORCHESTRATOR_PORT=3001
```

## Health Checks

### Orchestrator Health Endpoint
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Provider Status Endpoint
```bash
curl http://localhost:3001/api/providers
```

Expected response:
```json
{
  "providers": [
    { "id": "gpt", "status": "available" },
    { "id": "claude", "status": "available" },
    { "id": "gemini", "status": "available" },
    { "id": "copilot", "status": "available" },
    { "id": "tia", "status": "available" }
  ]
}
```

## Scaling

### Horizontal Scaling

1. **Frontend**: Deploy multiple instances behind a load balancer
2. **Backend**: Use multiple orchestrator instances with sticky sessions for WebSocket

### Vertical Scaling

Adjust Docker resource limits:
```yaml
services:
  orchestrator:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs orchestrator
docker-compose logs web

# Check if ports are in use
netstat -tuln | grep 3000
netstat -tuln | grep 3001
```

### WebSocket Connection Issues
- Ensure CORS is properly configured
- Check firewall rules
- Verify WebSocket support on load balancer

### Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
```

## Monitoring

### Recommended Tools

- **Logging**: Winston, Pino, or ELK stack
- **Metrics**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **APM**: New Relic or DataDog

### Basic Logging Setup

Add to orchestrator:
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
```

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] HTTPS enabled in production
- [ ] CORS configured with specific origins
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Authentication and authorization added
- [ ] Security headers configured
- [ ] Dependencies regularly updated
- [ ] Secrets rotation strategy in place
- [ ] Monitoring and alerting configured
