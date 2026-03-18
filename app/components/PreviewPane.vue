<script setup lang="ts">
defineProps<{
  url: string
  status: string
}>()
</script>

<template>
  <div class="border border-[var(--ui-border)] rounded-xl overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-2 bg-[var(--ui-bg-elevated)] border-b border-[var(--ui-border)]">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-400" />
        <div class="w-3 h-3 rounded-full bg-yellow-400" />
        <div class="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div class="flex-1 text-center">
        <span class="text-xs text-[var(--ui-text-dimmed)] font-mono">{{ url }}</span>
      </div>
      <UButton
        :to="url"
        external
        target="_blank"
        icon="i-heroicons-arrow-top-right-on-square"
        variant="ghost"
        size="xs"
      />
    </div>
    <div class="aspect-video bg-[var(--ui-bg)]">
      <iframe
        :src="url"
        class="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
    <div class="px-4 py-2 bg-[var(--ui-bg-elevated)] border-t border-[var(--ui-border)] flex items-center justify-between">
      <UBadge :color="status === 'cms:preview' ? 'warning' : status === 'cms:merged' ? 'success' : 'neutral'" variant="subtle">
        {{ status }}
      </UBadge>
      <div class="flex gap-2">
        <UButton v-if="status === 'cms:preview'" size="xs" color="primary">
          Approve & merge
        </UButton>
      </div>
    </div>
  </div>
</template>
