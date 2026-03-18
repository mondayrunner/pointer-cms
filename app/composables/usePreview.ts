export function usePreview() {
  const previewUrl = ref<string | null>(null)
  const previewStatus = ref<'pending' | 'building' | 'ready' | 'error'>('pending')

  async function checkPreview(prNumber: number) {
    try {
      const data = await $fetch(`/api/preview/${prNumber}`)
      const result = data as { url: string; status: string }
      previewUrl.value = result.url
      previewStatus.value = result.status as typeof previewStatus.value
    } catch {
      previewStatus.value = 'error'
    }
  }

  async function approvePR(prNumber: number) {
    await $fetch(`/api/conversations/approve`, {
      method: 'POST',
      body: { prNumber }
    })
  }

  return {
    previewUrl: readonly(previewUrl),
    previewStatus: readonly(previewStatus),
    checkPreview,
    approvePR
  }
}
