
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pointer-cms-token')
  const repo = getCookie(event, 'pointer-cms-repo')

  if (!token || !repo) {
    throw createError({ statusCode: 401, message: 'Not authenticated or no repo selected' })
  }

  const [owner, repoName] = repo.split('/')
  const github = createGitHubClient(token)

  return github.createConversation(owner, repoName)
})
