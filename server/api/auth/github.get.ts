export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const clientId = config.githubClientId

  if (!clientId) {
    throw createError({
      statusCode: 500,
      message: 'GitHub OAuth not configured. Run `npx pointer-cms init` and set your GitHub Client ID.'
    })
  }

  const requestUrl = getRequestURL(event)
  const redirectUri = `${requestUrl.origin}/api/auth/callback`
  const scope = 'repo'

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`

  return sendRedirect(event, url)
})
