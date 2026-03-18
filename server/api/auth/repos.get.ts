
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pointer-cms-token')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const github = createGitHubClient(token)
  return github.getRepos()
})
