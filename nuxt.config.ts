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
    githubClientId: '',
    githubClientSecret: '',
    cursorWebhookUrl: '',
    cursorWebhookKey: '',
    public: {
      githubClientId: '',
      appName: 'Pointer CMS'
    }
  },

  nitro: {
    preset: 'cloudflare-module'
  },

  compatibilityDate: '2025-03-18'
})
