import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Multi-AI Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Real-time chat with GPT, Claude, Gemini, Copilot, and TIA Works
        </p>
        <ChatInterface />
      </div>
    </main>
  )
}
