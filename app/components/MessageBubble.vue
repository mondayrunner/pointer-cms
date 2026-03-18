<script setup lang="ts">
import type { Message } from '~/composables/useConversations'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div
    class="flex gap-3"
    :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[80%] rounded-2xl px-4 py-3"
      :class="[
        message.role === 'user'
          ? 'bg-zinc-950 text-white rounded-br-sm dark:bg-white dark:text-zinc-950'
          : 'bg-transparent border border-zinc-950/10 text-zinc-950 rounded-bl-sm dark:border-white/10 dark:text-white'
      ]"
    >
      <div class="text-sm/6 whitespace-pre-wrap">{{ message.content }}</div>
      <div
        class="text-xs mt-1.5"
        :class="message.role === 'user' ? 'text-white/50 dark:text-zinc-950/50' : 'text-zinc-500 dark:text-zinc-400'"
      >
        {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </div>
    </div>
  </div>
</template>
