interface GitHubUser {
  login: string
  avatar_url: string
  name: string | null
}

const user = ref<GitHubUser | null>(null)
const accessToken = ref<string | null>(null)
const selectedRepo = ref<string | null>(null)
const isAuthenticated = computed(() => !!accessToken.value)

export function useGitHub() {
  async function checkAuth() {
    try {
      const data = await $fetch('/api/auth/me')
      if (data) {
        user.value = data.user as GitHubUser
        accessToken.value = data.token as string
        selectedRepo.value = data.repo as string | null
      }
    } catch {
      user.value = null
      accessToken.value = null
    }
  }

  function logout() {
    user.value = null
    accessToken.value = null
    selectedRepo.value = null
    $fetch('/api/auth/logout', { method: 'POST' })
  }

  return {
    user: readonly(user),
    accessToken: readonly(accessToken),
    selectedRepo: readonly(selectedRepo),
    isAuthenticated,
    checkAuth,
    logout
  }
}
