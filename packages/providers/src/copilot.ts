import { BaseProvider } from './base'

export class CopilotProvider extends BaseProvider {
  getName(): string {
    return 'Copilot'
  }

  protected getApiKey(): string | undefined {
    return process.env.GITHUB_COPILOT_TOKEN
  }

  async sendMessage(message: string): Promise<string> {
    // Placeholder implementation
    // In production, this would call the GitHub Copilot API
    return `Copilot response to: ${message}`
  }
}
