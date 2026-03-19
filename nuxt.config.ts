export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 4321
  },

  ssr: false,

  app: {
    head: {
      title: 'Pointer CMS',
      meta: [
        { name: 'description', content: 'What You Chat Is What You Get — The AI-powered CMS that replaces editors with conversations.' }
      ]
    }
  },

  runtimeConfig: {
    githubClientId: process.env.GITHUB_CLIENT_ID || '',
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    cursorWebhookUrl: process.env.CURSOR_WEBHOOK_URL || '',
    cursorWebhookKey: process.env.CURSOR_WEBHOOK_KEY || '',
    public: {
      githubClientId: process.env.GITHUB_CLIENT_ID || '',
      appName: 'Pointer CMS'
    }
  },

  nitro: {
    preset: 'cloudflare-module'
  },

  compatibilityDate: '2025-03-18'
})
