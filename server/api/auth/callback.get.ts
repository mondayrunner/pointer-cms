export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    throw createError({ statusCode: 400, message: 'Missing authorization code' })
  }

  const config = useRuntimeConfig()

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: config.githubClientId,
      client_secret: config.githubClientSecret,
      code
    })
  })

  const tokenData = await tokenResponse.json() as { access_token?: string; error?: string }

  if (tokenData.error || !tokenData.access_token) {
    throw createError({
      statusCode: 401,
      message: `GitHub OAuth error: ${tokenData.error || 'No access token received'}`
    })
  }

  // Store token in a session cookie (httpOnly for security)
  setCookie(event, 'pointer-cms-token', tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
    path: '/',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })

  return sendRedirect(event, '/setup')
})
