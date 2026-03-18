<script setup lang="ts">
const { currentConversation, sendMessage, isLoading } = useConversations()
const { isAuthenticated, user } = useGitHub()

const messageInput = ref('')

async function handleSend() {
  if (!messageInput.value.trim() || isLoading.value) return

  const message = messageInput.value
  messageInput.value = ''
  await sendMessage(message)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div v-if="!isAuthenticated" class="flex-1 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto px-6">
      <div class="mb-6">
        <span class="font-mono text-sm text-[var(--ui-text-dimmed)]">cursor: pointer;</span>
        <h1 class="text-3xl font-bold mt-2 text-[var(--ui-text)]">Pointer CMS</h1>
        <p class="text-[var(--ui-text-muted)] mt-2">What You Chat Is What You Get</p>
      </div>
      <p class="text-[var(--ui-text-muted)] mb-6">
        Sign in with GitHub to connect your repositories and start managing content through conversation.
      </p>
      <UButton
        to="/api/auth/github"
        external
        icon="i-simple-icons-github"
        size="lg"
      >
        Sign in with GitHub
      </UButton>
    </div>
  </div>

  <template v-else>
    <StatusBar />

    <div class="flex-1 overflow-y-auto px-6 py-4">
      <div v-if="!currentConversation" class="flex-1 flex items-center justify-center h-full">
        <div class="text-center max-w-lg">
          <h2 class="text-2xl font-bold text-[var(--ui-text)]">What do you want to build?</h2>
          <p class="text-[var(--ui-text-muted)] mt-2">
            Describe your content changes in natural language. Pointer CMS will generate the code in your project.
          </p>
        </div>
      </div>

      <ChatWindow v-else :conversation="currentConversation" />
    </div>

    <div class="border-t border-[var(--ui-border)] px-6 py-4">
      <div class="max-w-3xl mx-auto flex gap-3">
        <UTextarea
          v-model="messageInput"
          placeholder="Describe what content you want to add or change..."
          autoresize
          :rows="1"
          :maxrows="6"
          class="flex-1"
          @keydown="handleKeydown"
        />
        <UButton
          icon="i-heroicons-paper-airplane"
          :loading="isLoading"
          :disabled="!messageInput.trim()"
          @click="handleSend"
        />
      </div>
    </div>
  </template>
</template>
