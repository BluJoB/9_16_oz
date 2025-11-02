import {
  AIProvider,
  GPTProvider,
  ClaudeProvider,
  GeminiProvider,
  CopilotProvider,
  TIAWorksProvider,
} from '@multi-ai-dashboard/providers'

export class ProviderOrchestrator {
  private providers: Map<string, AIProvider>

  constructor() {
    this.providers = new Map<string, AIProvider>([
      ['gpt', new GPTProvider()],
      ['claude', new ClaudeProvider()],
      ['gemini', new GeminiProvider()],
      ['copilot', new CopilotProvider()],
      ['tia', new TIAWorksProvider()],
    ])
  }

  async sendMessage(providerId: string, message: string): Promise<string> {
    const provider = this.providers.get(providerId)
    
    if (!provider) {
      throw new Error(`Provider ${providerId} not found`)
    }

    try {
      return await provider.sendMessage(message)
    } catch (error) {
      console.error(`Error from provider ${providerId}:`, error)
      throw error
    }
  }

  getProviderStatus() {
    return Array.from(this.providers.keys()).map((id) => ({
      id,
      status: 'available',
    }))
  }
}
