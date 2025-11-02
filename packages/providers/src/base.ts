export interface AIProvider {
  sendMessage(message: string): Promise<string>
  getName(): string
}

export abstract class BaseProvider implements AIProvider {
  protected apiKey: string | undefined

  constructor() {
    this.apiKey = this.getApiKey()
  }

  abstract sendMessage(message: string): Promise<string>
  abstract getName(): string
  protected abstract getApiKey(): string | undefined
}
