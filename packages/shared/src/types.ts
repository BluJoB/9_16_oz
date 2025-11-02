export type ProviderId = 'gpt' | 'claude' | 'gemini' | 'copilot' | 'tia'

export interface Message {
  id: string
  provider: ProviderId
  content: string
  timestamp: number
  role: 'user' | 'assistant'
}

export interface ChatRequest {
  message: string
  providers: ProviderId[]
}

export interface ChatResponse {
  provider: ProviderId
  message: string
  timestamp: number
}

export interface ProviderStatus {
  id: ProviderId
  name: string
  status: 'available' | 'unavailable' | 'error'
}
