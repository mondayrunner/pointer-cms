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
          ? 'bg-[var(--ui-color-primary-500)] text-white rounded-br-sm'
          : 'bg-[var(--ui-bg-elevated)] text-[var(--ui-text)] rounded-bl-sm border border-[var(--ui-border)]'
      ]"
    >
      <div class="text-sm whitespace-pre-wrap">{{ message.content }}</div>
      <div
        class="text-xs mt-1"
        :class="message.role === 'user' ? 'text-white/60' : 'text-[var(--ui-text-dimmed)]'"
      >
        {{ new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </div>
    </div>
  </div>
</template>
