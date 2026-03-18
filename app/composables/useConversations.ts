export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

export interface Conversation {
  id: number
  title: string
  status: string
  messages: Message[]
  previewUrl: string | null
  prNumber: number | null
}

const conversations = ref<Conversation[]>([])
const currentConversation = ref<Conversation | null>(null)
const isLoading = ref(false)

export function useConversations() {
  async function loadConversations() {
    try {
      const data = await $fetch('/api/conversations')
      conversations.value = data as Conversation[]
    } catch {
      conversations.value = []
    }
  }

  async function createConversation() {
    try {
      const data = await $fetch('/api/conversations', { method: 'POST' })
      const conv = data as Conversation
      conversations.value.unshift(conv)
      currentConversation.value = conv
    } catch (e) {
      console.error('Failed to create conversation:', e)
    }
  }

  function selectConversation(conv: Conversation) {
    currentConversation.value = conv
  }

  async function sendMessage(content: string) {
    if (!currentConversation.value) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    }

    currentConversation.value.messages.push(userMessage)
    isLoading.value = true

    try {
      const data = await $fetch(`/api/conversations/${currentConversation.value.id}/messages`, {
        method: 'POST',
        body: { content }
      })

      const response = data as { message: Message; previewUrl?: string; status?: string }

      if (response.message) {
        currentConversation.value.messages.push(response.message)
      }
      if (response.previewUrl) {
        currentConversation.value.previewUrl = response.previewUrl
      }
      if (response.status) {
        currentConversation.value.status = response.status
      }

      // Update title from first user message
      if (!currentConversation.value.title && content.length > 0) {
        currentConversation.value.title = content.slice(0, 60) + (content.length > 60 ? '...' : '')
      }
    } catch (e) {
      console.error('Failed to send message:', e)
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'system',
        content: 'Failed to process your request. Please try again.',
        createdAt: new Date().toISOString()
      }
      currentConversation.value.messages.push(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  return {
    conversations: readonly(conversations),
    currentConversation,
    isLoading: readonly(isLoading),
    loadConversations,
    createConversation,
    selectConversation,
    sendMessage
  }
}
