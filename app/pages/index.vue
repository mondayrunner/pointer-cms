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
  <!-- Unauthenticated -->
  <div v-if="!isAuthenticated" class="flex-1 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto">
      <div class="mb-8">
        <span class="font-mono text-xs text-zinc-500 dark:text-zinc-400">cursor: pointer;</span>
        <h1 class="text-2xl/8 font-semibold text-zinc-950 dark:text-white mt-2">Pointer CMS</h1>
        <p class="text-base/7 text-zinc-500 dark:text-zinc-400 mt-2">What You Chat Is What You Get</p>
      </div>
      <p class="text-sm/6 text-zinc-500 dark:text-zinc-400 mb-8">
        Sign in with GitHub to connect your repositories and start managing content through conversation.
      </p>
      <a
        href="/api/auth/github"
        class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-950 text-white text-sm/5 font-medium px-4 py-2.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        <UIcon name="i-simple-icons-github" class="size-5 sm:size-4" />
        Sign in with GitHub
      </a>
    </div>
  </div>

  <!-- Authenticated -->
  <template v-else>
    <!-- Empty state -->
    <div v-if="!currentConversation" class="flex-1 flex items-center justify-center">
      <div class="text-center max-w-lg">
        <h2 class="text-2xl/8 font-semibold text-zinc-950 dark:text-white">What do you want to build?</h2>
        <p class="text-base/7 text-zinc-500 dark:text-zinc-400 mt-2">
          Describe your content changes in natural language. Pointer CMS will generate the code in your project.
        </p>
      </div>
    </div>

    <!-- Chat -->
    <div v-else class="flex-1 overflow-y-auto py-4">
      <ChatWindow :conversation="currentConversation" />
    </div>

    <!-- Input -->
    <div class="border-t border-zinc-950/5 pt-4 dark:border-white/5">
      <div class="flex gap-3">
        <div class="relative block w-full flex-1 before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden">
          <textarea
            v-model="messageInput"
            placeholder="Describe what content you want to add or change..."
            rows="1"
            class="relative block w-full appearance-none rounded-lg border border-zinc-950/10 bg-transparent px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 focus:outline-hidden sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)] sm:text-sm/6 dark:border-white/10 dark:text-white dark:bg-white/5"
            @keydown="handleKeydown"
          />
        </div>
        <button
          :disabled="!messageInput.trim() || isLoading"
          class="inline-flex shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white px-3 py-2.5 sm:py-2 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          @click="handleSend"
        >
          <svg v-if="isLoading" class="size-5 sm:size-4 animate-spin" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.379 2.624l1.077-1.077a4 4 0 0 0 6.856-1.93l1.446.383ZM4.688 8.576a5.5 5.5 0 0 1 9.379-2.624l-1.077 1.077a4 4 0 0 0-6.856 1.93l-1.446-.383Z" clip-rule="evenodd" /></svg>
          <svg v-else class="size-5 sm:size-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" /></svg>
        </button>
      </div>
    </div>
  </template>
</template>
