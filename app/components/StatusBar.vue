<script setup lang="ts">
const { selectedRepo } = useGitHub()
const { currentConversation } = useConversations()
</script>

<template>
  <div class="flex items-center gap-4 py-2 text-sm/6">
    <div v-if="selectedRepo" class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
      <svg class="size-5 sm:size-4 fill-zinc-500 dark:fill-zinc-400" viewBox="0 0 20 20"><path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75Z" /><path d="M3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" /></svg>
      <span class="font-mono text-xs">{{ selectedRepo }}</span>
    </div>
    <div v-if="currentConversation" class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
      <svg class="size-5 sm:size-4 fill-zinc-500 dark:fill-zinc-400" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 0 1-1.504-.123 5.976 5.976 0 0 1-3.935 1.107.75.75 0 0 1-.584-1.143 3.478 3.478 0 0 0 .522-1.756C2.979 13.825 2 12.025 2 10Z" clip-rule="evenodd" /></svg>
      <span class="truncate">{{ currentConversation.title || 'New conversation' }}</span>
    </div>
    <div class="flex-1" />
    <NuxtLink
      to="/setup"
      class="text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
    >
      Settings
    </NuxtLink>
  </div>
</template>
