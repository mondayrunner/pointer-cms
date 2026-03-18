
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pointer-cms-token')
  const repo = getCookie(event, 'pointer-cms-repo')
  const body = await readBody(event)
  const prNumber = body.prNumber as number

  if (!token || !repo) {
    throw createError({ statusCode: 401, message: 'Not authenticated or no repo selected' })
  }

  if (!prNumber) {
    throw createError({ statusCode: 400, message: 'PR number is required' })
  }

  const [owner, repoName] = repo.split('/')
  const github = createGitHubClient(token)

  await github.mergePR(owner, repoName, prNumber)

  return { ok: true, merged: true }
})
