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
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
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

  compatibilityDate: '2025-03-18'
})
