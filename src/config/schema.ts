export interface PointerCMSConfig {
  githubClientId: string
  githubClientSecret: string
  cursorWebhookUrl: string
  cursorWebhookKey: string
  cloudflarePageProject: string
  port: number
}

export const defaultConfig: PointerCMSConfig = {
  githubClientId: '',
  githubClientSecret: '',
  cursorWebhookUrl: '',
  cursorWebhookKey: '',
  cloudflarePageProject: '',
  port: 4321
}
