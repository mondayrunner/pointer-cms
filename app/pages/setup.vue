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
    <div class="max-w-md w-full mx-auto px-6">
      <div class="mb-6">
        <span class="font-mono text-sm text-[var(--ui-text-dimmed)]">cursor: pointer;</span>
        <h1 class="text-2xl font-bold mt-2 text-[var(--ui-text)]">Select repository</h1>
        <p class="text-[var(--ui-text-muted)] mt-2">
          Choose which repository Pointer CMS should manage content for.
        </p>
      </div>

      <div v-if="isLoadingRepos" class="py-8 text-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl text-[var(--ui-text-muted)]" />
        <p class="text-[var(--ui-text-muted)] mt-2">Loading repositories...</p>
      </div>

      <div v-else class="space-y-3">
        <USelectMenu
          v-model="selectedRepo"
          :items="repos.map(r => ({ label: r.full_name, value: r.full_name, description: r.description || '' }))"
          placeholder="Select a repository"
          searchable
        />

        <UButton
          block
          :disabled="!selectedRepo"
          @click="selectRepo"
        >
          Continue
        </UButton>
      </div>
    </div>
  </div>
</template>
