export interface CursorAutomationPayload {
  repo: string
  issueNumber: number
  prompt: string
  branch: string
}

export async function triggerCursorAutomation(
  webhookUrl: string,
  webhookKey: string,
  payload: CursorAutomationPayload
) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${webhookKey}`
    },
    body: JSON.stringify({
      action: 'generate',
      repo: payload.repo,
      issue_number: payload.issueNumber,
      prompt: payload.prompt,
      branch: payload.branch
    })
  })

  if (!response.ok) {
    throw new Error(`Cursor Automation failed: ${response.statusText}`)
  }

  return response.json()
}

export function generateBranchName(issueNumber: number): string {
  return `pointer-cms/issue-${issueNumber}`
}
