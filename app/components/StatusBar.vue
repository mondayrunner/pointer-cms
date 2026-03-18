<script setup lang="ts">
const { selectedRepo } = useGitHub()
const { currentConversation } = useConversations()
</script>

<template>
  <div class="border-b border-[var(--ui-border)] px-6 py-2 flex items-center gap-4 text-sm">
    <div v-if="selectedRepo" class="flex items-center gap-1.5 text-[var(--ui-text-muted)]">
      <UIcon name="i-heroicons-folder" />
      <span class="font-mono text-xs">{{ selectedRepo }}</span>
    </div>
    <div v-if="currentConversation" class="flex items-center gap-1.5 text-[var(--ui-text-muted)]">
      <UIcon name="i-heroicons-chat-bubble-left-right" />
      <span>{{ currentConversation.title || 'New conversation' }}</span>
    </div>
    <div class="flex-1" />
    <NuxtLink to="/setup" class="text-xs text-[var(--ui-text-dimmed)] hover:text-[var(--ui-text)]">
      Settings
    </NuxtLink>
  </div>
</template>
