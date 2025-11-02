import { BaseProvider } from './base'

export class GPTProvider extends BaseProvider {
  getName(): string {
    return 'GPT'
  }

  protected getApiKey(): string | undefined {
    return process.env.OPENAI_API_KEY
  }

  async sendMessage(message: string): Promise<string> {
    // Placeholder implementation
    // In production, this would call the OpenAI API
    return `GPT response to: ${message}`
  }
}
