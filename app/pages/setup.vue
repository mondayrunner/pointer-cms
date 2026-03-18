<script setup lang="ts">
const { user } = useGitHub()
const repos = ref<Array<{ full_name: string; description: string | null }>>([])
const selectedRepo = ref('')
const isLoadingRepos = ref(false)

async function loadRepos() {
  isLoadingRepos.value = true
  try {
    const data = await $fetch('/api/auth/repos')
    repos.value = data as typeof repos.value
  } finally {
    isLoadingRepos.value = false
  }
}

async function selectRepo() {
  if (!selectedRepo.value) return
  await $fetch('/api/auth/select-repo', {
    method: 'POST',
    body: { repo: selectedRepo.value }
  })
  navigateTo('/')
}

onMounted(() => {
  loadRepos()
})
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto">
      <div class="mb-8">
        <span class="font-mono text-xs text-zinc-500 dark:text-zinc-400">cursor: pointer;</span>
        <h1 class="text-2xl/8 font-semibold text-zinc-950 dark:text-white mt-2">Select repository</h1>
        <p class="text-base/7 text-zinc-500 dark:text-zinc-400 mt-2">
          Choose which repository Pointer CMS should manage content for.
        </p>
      </div>

      <div v-if="isLoadingRepos" class="py-8 text-center">
        <svg class="size-5 animate-spin text-zinc-500 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.379 2.624l1.077-1.077a4 4 0 0 0 6.856-1.93l1.446.383ZM4.688 8.576a5.5 5.5 0 0 1 9.379-2.624l-1.077 1.077a4 4 0 0 0-6.856 1.93l-1.446-.383Z" clip-rule="evenodd" /></svg>
        <p class="text-sm/6 text-zinc-500 dark:text-zinc-400 mt-2">Loading repositories...</p>
      </div>

      <div v-else class="space-y-4">
        <div class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden">
          <select
            v-model="selectedRepo"
            class="relative block w-full appearance-none rounded-lg border border-zinc-950/10 bg-transparent px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)] text-base/6 text-zinc-950 sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)] sm:text-sm/6 dark:border-white/10 dark:text-white dark:bg-white/5 focus:outline-hidden"
          >
            <option value="" disabled>Select a repository</option>
            <option v-for="repo in repos" :key="repo.full_name" :value="repo.full_name">
              {{ repo.full_name }}
            </option>
          </select>
        </div>

        <button
          :disabled="!selectedRepo"
          class="flex w-full items-center justify-center rounded-lg bg-zinc-950 text-white text-sm/5 font-medium px-4 py-2.5 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          @click="selectRepo"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
