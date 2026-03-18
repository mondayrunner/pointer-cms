
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pointer-cms-token')
  const repo = getCookie(event, 'pointer-cms-repo')
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const content = body.content as string

  if (!token || !repo) {
    throw createError({ statusCode: 401, message: 'Not authenticated or no repo selected' })
  }

  if (!content?.trim()) {
    throw createError({ statusCode: 400, message: 'Message content is required' })
  }

  const [owner, repoName] = repo.split('/')
  const github = createGitHubClient(token)
  const config = useRuntimeConfig()

  // Save user message as issue comment
  await github.addMessage(owner, repoName, id, 'user', content)

  // Update issue title from first message
  await github.updateConversationTitle(owner, repoName, id, content.slice(0, 80))

  // Trigger Cursor Automation if configured
  let assistantMessage = 'Processing your request...'
  let previewUrl: string | undefined
  let status = 'cms:draft'

  if (config.cursorWebhookUrl) {
    try {
      const branch = generateBranchName(id)

      const result = await triggerCursorAutomation(
        config.cursorWebhookUrl,
        config.cursorWebhookKey,
        {
          repo: `${owner}/${repoName}`,
          issueNumber: id,
          prompt: content,
          branch
        }
      )

      assistantMessage = `Building your changes on branch \`${branch}\`... I'll create a preview once the code is generated.`
      status = 'cms:preview'

      if (result.previewUrl) {
        previewUrl = result.previewUrl
      }

      await github.setStatus(owner, repoName, id, status)
    } catch (e) {
      assistantMessage = `I received your request but couldn't trigger the automation. Make sure your Cursor webhook is configured correctly.\n\nYour message has been saved to the conversation.`
    }
  } else {
    assistantMessage = `Your request has been saved. Configure a Cursor Automation webhook to enable AI-powered content generation.\n\nRun \`npx pointer-cms init\` to set up your configuration.`
  }

  // Save assistant response
  const message = await github.addMessage(owner, repoName, id, 'assistant', assistantMessage)

  return {
    message,
    previewUrl,
    status
  }
})
