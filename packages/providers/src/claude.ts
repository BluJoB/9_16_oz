import { BaseProvider } from './base'

export class ClaudeProvider extends BaseProvider {
  getName(): string {
    return 'Claude'
  }

  protected getApiKey(): string | undefined {
    return process.env.ANTHROPIC_API_KEY
  }

  async sendMessage(message: string): Promise<string> {
    // Placeholder implementation
    // In production, this would call the Anthropic API
    return `Claude response to: ${message}`
  }
}
