<script setup lang="ts">
const { conversations, currentConversation, createConversation, selectConversation } = useConversations()
const { isAuthenticated, user } = useGitHub()
</script>

<template>
  <nav class="flex h-full min-h-0 flex-col">
    <!-- Header -->
    <div class="flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5">
      <div class="flex items-center gap-3 px-2 py-2.5 sm:py-2">
        <span class="font-mono text-xs text-zinc-500 dark:text-zinc-400">cursor: pointer;</span>
        <span class="truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Pointer CMS</span>
      </div>
      <button
        v-if="isAuthenticated"
        class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950/5 px-2 py-2.5 text-sm/5 font-medium text-zinc-950 hover:bg-zinc-950/10 sm:py-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        @click="createConversation"
      >
        <svg class="size-5 sm:size-4 fill-zinc-500" viewBox="0 0 20 20"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
        New conversation
      </button>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col overflow-y-auto p-4">
      <div class="flex flex-col gap-0.5">
        <span
          v-for="conv in conversations"
          :key="conv.id"
          class="relative"
        >
          <span
            v-if="currentConversation?.id === conv.id"
            class="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
          />
          <button
            class="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium sm:py-2 sm:text-sm/5"
            :class="[
              currentConversation?.id === conv.id
                ? 'text-zinc-950 dark:text-white'
                : 'text-zinc-500 hover:bg-zinc-950/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white'
            ]"
            @click="selectConversation(conv)"
          >
            <span class="truncate">{{ conv.title || 'Untitled conversation' }}</span>
          </button>
        </span>
      </div>

      <div v-if="isAuthenticated && conversations.length === 0" class="flex-1 flex items-center justify-center">
        <p class="text-xs/6 font-medium text-zinc-500 dark:text-zinc-400">No conversations yet</p>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="isAuthenticated && user" class="flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 max-lg:hidden">
      <div class="flex min-w-0 items-center gap-3 px-2 py-2.5 sm:py-2">
        <UAvatar :src="user.avatar_url" :alt="user.login" size="sm" class="size-10 sm:size-8" />
        <span class="min-w-0">
          <span class="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{{ user.login }}</span>
        </span>
      </div>
    </div>
  </nav>
</template>
