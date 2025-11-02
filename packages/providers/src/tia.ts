import { BaseProvider } from './base'

export class TIAWorksProvider extends BaseProvider {
  getName(): string {
    return 'TIA Works'
  }

  protected getApiKey(): string | undefined {
    return process.env.TIA_WORKS_API_KEY
  }

  async sendMessage(message: string): Promise<string> {
    // Placeholder implementation
    // In production, this would call the TIA Works API
    return `TIA Works response to: ${message}`
  }
}
