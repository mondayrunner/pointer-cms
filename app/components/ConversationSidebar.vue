<script setup lang="ts">
const { conversations, currentConversation, createConversation, selectConversation } = useConversations()
const { isAuthenticated, user } = useGitHub()
</script>

<template>
  <aside class="w-72 border-r border-[var(--ui-border)] flex flex-col bg-[var(--ui-bg-elevated)]">
    <div class="p-4 border-b border-[var(--ui-border)]">
      <div class="flex items-center gap-2 mb-4">
        <span class="font-mono text-xs text-[var(--ui-text-dimmed)]">cursor: pointer;</span>
        <span class="text-sm font-semibold text-[var(--ui-text)]">Pointer CMS</span>
      </div>
      <UButton
        v-if="isAuthenticated"
        block
        icon="i-heroicons-plus"
        variant="soft"
        @click="createConversation"
      >
        New conversation
      </UButton>
    </div>

    <nav class="flex-1 overflow-y-auto p-2">
      <ul class="space-y-1">
        <li v-for="conv in conversations" :key="conv.id">
          <button
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
            :class="[
              currentConversation?.id === conv.id
                ? 'bg-[var(--ui-bg-accented)] text-[var(--ui-text)]'
                : 'text-[var(--ui-text-muted)] hover:bg-[var(--ui-bg-elevated-hover)] hover:text-[var(--ui-text)]'
            ]"
            @click="selectConversation(conv)"
          >
            <div class="truncate">{{ conv.title || 'Untitled conversation' }}</div>
            <div class="text-xs text-[var(--ui-text-dimmed)] mt-0.5">
              {{ conv.status }}
            </div>
          </button>
        </li>
      </ul>

      <div v-if="isAuthenticated && conversations.length === 0" class="px-3 py-6 text-center">
        <p class="text-sm text-[var(--ui-text-dimmed)]">No conversations yet</p>
      </div>
    </nav>

    <div v-if="isAuthenticated && user" class="p-4 border-t border-[var(--ui-border)]">
      <div class="flex items-center gap-2">
        <UAvatar :src="user.avatar_url" :alt="user.login" size="sm" />
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-[var(--ui-text)] truncate">{{ user.login }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>
