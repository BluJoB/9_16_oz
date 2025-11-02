# Orchestrator Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy workspace files
COPY package.json package-lock.json* ./
COPY apps/orchestrator/package.json ./apps/orchestrator/
COPY packages/providers/package.json ./packages/providers/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build all packages
RUN npm run build --workspace=@multi-ai-dashboard/shared
RUN npm run build --workspace=@multi-ai-dashboard/providers
RUN npm run build --workspace=@multi-ai-dashboard/orchestrator

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built files
COPY --from=builder --chown=nodejs:nodejs /app/apps/orchestrator/dist ./apps/orchestrator/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/providers/dist ./packages/providers/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/apps/orchestrator/package.json ./apps/orchestrator/
COPY --from=builder --chown=nodejs:nodejs /app/packages/providers/package.json ./packages/providers/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared/package.json ./packages/shared/

USER nodejs

EXPOSE 3001

CMD ["node", "apps/orchestrator/dist/index.js"]
