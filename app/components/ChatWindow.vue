<script setup lang="ts">
import type { Conversation } from '~/composables/useConversations'

const props = defineProps<{
  conversation: Conversation
}>()

const messagesEnd = ref<HTMLElement>()

function scrollToBottom() {
  nextTick(() => {
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

watch(
  () => props.conversation.messages.length,
  () => scrollToBottom()
)

onMounted(() => scrollToBottom())
</script>

<template>
  <div class="max-w-3xl mx-auto w-full space-y-4">
    <MessageBubble
      v-for="message in conversation.messages"
      :key="message.id"
      :message="message"
    />

    <PreviewPane
      v-if="conversation.previewUrl"
      :url="conversation.previewUrl"
      :status="conversation.status"
    />

    <div ref="messagesEnd" />
  </div>
</template>
