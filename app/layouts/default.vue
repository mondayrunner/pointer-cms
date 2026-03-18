<template>
  <div class="flex h-screen bg-[var(--ui-bg)]">
    <ConversationSidebar />
    <main class="flex-1 flex flex-col min-w-0">
      <slot />
    </main>
  </div>
</template>
