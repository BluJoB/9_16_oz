import { BaseProvider } from './base'

export class GeminiProvider extends BaseProvider {
  getName(): string {
    return 'Gemini'
  }

  protected getApiKey(): string | undefined {
    return process.env.GOOGLE_API_KEY
  }

  async sendMessage(message: string): Promise<string> {
    // Placeholder implementation
    // In production, this would call the Google Gemini API
    return `Gemini response to: ${message}`
  }
}
