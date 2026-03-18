export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const repo = body.repo as string

  if (!repo || !repo.includes('/')) {
    throw createError({ statusCode: 400, message: 'Invalid repository format. Expected owner/repo.' })
  }

  setCookie(event, 'pointer-cms-repo', repo, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })

  return { ok: true, repo }
})
