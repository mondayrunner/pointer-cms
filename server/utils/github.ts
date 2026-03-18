import { Octokit } from '@octokit/rest'

const CMS_LABEL = 'pointer-cms'

export function createGitHubClient(token: string) {
  const octokit = new Octokit({ auth: token })

  return {
    async getUser() {
      const { data } = await octokit.rest.users.getAuthenticated()
      return data
    },

    async getRepos() {
      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100
      })
      return data.map(r => ({
        full_name: r.full_name,
        description: r.description
      }))
    },

    async getConversations(owner: string, repo: string) {
      const { data: issues } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        labels: CMS_LABEL,
        state: 'all',
        sort: 'updated',
        direction: 'desc',
        per_page: 50
      })

      return issues.map(issue => ({
        id: issue.number,
        title: issue.title,
        status: issue.labels
          .map(l => typeof l === 'string' ? l : l.name)
          .find(l => l?.startsWith('cms:')) || 'cms:draft',
        messages: [],
        previewUrl: null,
        prNumber: null
      }))
    },

    async createConversation(owner: string, repo: string) {
      // Ensure the pointer-cms label exists
      try {
        await octokit.rest.issues.getLabel({ owner, repo, name: CMS_LABEL })
      } catch {
        await octokit.rest.issues.createLabel({
          owner,
          repo,
          name: CMS_LABEL,
          color: '6366f1',
          description: 'Pointer CMS conversation'
        })
      }

      const { data: issue } = await octokit.rest.issues.create({
        owner,
        repo,
        title: 'New conversation',
        labels: [CMS_LABEL, 'cms:draft'],
        body: '_Created by Pointer CMS_'
      })

      return {
        id: issue.number,
        title: '',
        status: 'cms:draft',
        messages: [],
        previewUrl: null,
        prNumber: null
      }
    },

    async getMessages(owner: string, repo: string, issueNumber: number) {
      const { data: comments } = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number: issueNumber,
        per_page: 100
      })

      return comments.map(comment => ({
        id: String(comment.id),
        role: comment.body?.startsWith('**[assistant]**') ? 'assistant' as const : 'user' as const,
        content: (comment.body || '')
          .replace(/^\*\*\[(user|assistant)\]\*\*\s*/, ''),
        createdAt: comment.created_at
      }))
    },

    async addMessage(owner: string, repo: string, issueNumber: number, role: 'user' | 'assistant', content: string) {
      const { data: comment } = await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: `**[${role}]** ${content}`
      })

      return {
        id: String(comment.id),
        role,
        content,
        createdAt: comment.created_at
      }
    },

    async updateConversationTitle(owner: string, repo: string, issueNumber: number, title: string) {
      await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        title
      })
    },

    async setStatus(owner: string, repo: string, issueNumber: number, status: string) {
      const { data: issue } = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number: issueNumber
      })

      // Remove existing cms: labels
      const currentLabels = issue.labels
        .map(l => typeof l === 'string' ? l : l.name || '')
        .filter(l => !l.startsWith('cms:'))

      currentLabels.push(status)

      await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        labels: currentLabels
      })
    },

    async mergePR(owner: string, repo: string, prNumber: number) {
      await octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: prNumber
      })
    }
  }
}
