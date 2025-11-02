import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { ProviderOrchestrator } from './orchestrator'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const orchestrator = new ProviderOrchestrator()

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Provider status endpoint
app.get('/api/providers', (req, res) => {
  res.json({
    providers: orchestrator.getProviderStatus(),
  })
})

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('chat:message', async (data) => {
    const { message, providers } = data

    try {
      // Emit responses from each provider
      for (const provider of providers) {
        const response = await orchestrator.sendMessage(provider, message)
        socket.emit('chat:response', {
          provider,
          message: response,
          timestamp: Date.now(),
        })
      }
    } catch (error) {
      socket.emit('chat:error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.ORCHESTRATOR_PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Orchestrator server running on port ${PORT}`)
})
