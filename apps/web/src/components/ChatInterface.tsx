'use client'

import { useState } from 'react'

type Provider = 'gpt' | 'claude' | 'gemini' | 'copilot' | 'tia'

interface Message {
  id: string
  provider: Provider
  content: string
  timestamp: number
}

const providers: { name: string; id: Provider; color: string }[] = [
  { name: 'GPT', id: 'gpt', color: 'bg-gpt' },
  { name: 'Claude', id: 'claude', color: 'bg-claude' },
  { name: 'Gemini', id: 'gemini', color: 'bg-gemini' },
  { name: 'Copilot', id: 'copilot', color: 'bg-copilot' },
  { name: 'TIA Works', id: 'tia', color: 'bg-tia' },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>(['gpt'])

  const toggleProvider = (provider: Provider) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    )
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Placeholder for actual API call
    const newMessages: Message[] = selectedProviders.map((provider) => ({
      id: `${provider}-${Date.now()}`,
      provider,
      content: `[${provider.toUpperCase()}] Response to: ${input}`,
      timestamp: Date.now(),
    }))

    setMessages([...messages, ...newMessages])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-lg bg-white">
      {/* Provider Selection */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-2">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => toggleProvider(provider.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedProviders.includes(provider.id)
                  ? `${provider.color} text-white`
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            Select providers and start chatting...
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="p-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold uppercase ${
                    providers.find((p) => p.id === message.provider)?.color
                  } px-2 py-1 rounded text-white`}
                >
                  {message.provider}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-800">{message.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || selectedProviders.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
