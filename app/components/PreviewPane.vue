<script setup lang="ts">
defineProps<{
  url: string
  status: string
}>()
</script>

<template>
  <div class="rounded-lg bg-zinc-950/2.5 p-2 dark:bg-white/5">
    <div class="relative overflow-hidden rounded-sm dark:after:absolute dark:after:inset-0 dark:after:rounded-sm dark:after:outline-1 dark:after:-outline-offset-1 dark:after:outline-white/10">
      <!-- Browser chrome -->
      <div class="flex items-center gap-2 px-4 py-2 bg-zinc-50 border-b border-zinc-950/5 dark:bg-zinc-800 dark:border-white/5">
        <div class="flex gap-1.5">
          <div class="size-2.5 rounded-full bg-zinc-950/10 dark:bg-white/10" />
          <div class="size-2.5 rounded-full bg-zinc-950/10 dark:bg-white/10" />
          <div class="size-2.5 rounded-full bg-zinc-950/10 dark:bg-white/10" />
        </div>
        <div class="flex-1 text-center">
          <span class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{{ url }}</span>
        </div>
        <a :href="url" target="_blank" class="flex size-6 items-center justify-center rounded hover:bg-zinc-950/5 dark:hover:bg-white/5">
          <svg class="size-3.5 fill-zinc-500" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" /></svg>
        </a>
      </div>
      <!-- Preview -->
      <div class="aspect-video bg-white dark:bg-zinc-900">
        <iframe :src="url" class="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" />
      </div>
      <!-- Status -->
      <div class="px-4 py-2 bg-zinc-50 border-t border-zinc-950/5 dark:bg-zinc-800 dark:border-white/5 flex items-center justify-between">
        <span
          class="inline-flex rounded-full px-2 text-xs/6 font-medium"
          :class="[
            status === 'cms:preview' ? 'bg-amber-400/10 text-amber-700 dark:text-amber-400' :
            status === 'cms:merged' ? 'bg-emerald-400/10 text-emerald-700 dark:text-emerald-400' :
            'bg-zinc-950/5 text-zinc-700 dark:bg-white/5 dark:text-zinc-300'
          ]"
        >
          {{ status }}
        </span>
        <button
          v-if="status === 'cms:preview'"
          class="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-zinc-950 text-white text-xs/6 font-medium px-3 py-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Approve &amp; merge
        </button>
      </div>
    </div>
  </div>
</template>
