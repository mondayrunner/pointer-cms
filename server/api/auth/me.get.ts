
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pointer-cms-token')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const repo = getCookie(event, 'pointer-cms-repo') || null
  const github = createGitHubClient(token)
  const user = await github.getUser()

  return {
    user: {
      login: user.login,
      avatar_url: user.avatar_url,
      name: user.name
    },
    token,
    repo
  }
})
