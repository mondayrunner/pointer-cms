#!/usr/bin/env node

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const command = args[0] || 'dev'

const CONFIG_FILE = '.pointercms'
const DEFAULT_PORT = 4321

function loadConfig() {
  const configPath = resolve(process.cwd(), CONFIG_FILE)
  if (existsSync(configPath)) {
    try {
      return JSON.parse(readFileSync(configPath, 'utf-8'))
    } catch {
      console.warn(`Warning: Could not parse ${CONFIG_FILE}`)
    }
  }
  return {}
}

function initConfig() {
  const configPath = resolve(process.cwd(), CONFIG_FILE)
  if (existsSync(configPath)) {
    console.log(`${CONFIG_FILE} already exists.`)
    return
  }

  const config = {
    githubClientId: '',
    githubClientSecret: '',
    cursorWebhookUrl: '',
    cursorWebhookKey: '',
    cloudflarePageProject: '',
    port: DEFAULT_PORT
  }

  writeFileSync(configPath, JSON.stringify(config, null, 2))
  console.log(`Created ${CONFIG_FILE}`)
  console.log('Fill in your GitHub OAuth and Cursor Automation credentials to get started.')
}

async function startDev() {
  const config = loadConfig()
  const port = config.port || DEFAULT_PORT

  // Set environment variables from config
  if (config.githubClientId) process.env.GITHUB_CLIENT_ID = config.githubClientId
  if (config.githubClientSecret) process.env.GITHUB_CLIENT_SECRET = config.githubClientSecret
  if (config.cursorWebhookUrl) process.env.CURSOR_WEBHOOK_URL = config.cursorWebhookUrl
  if (config.cursorWebhookKey) process.env.CURSOR_WEBHOOK_KEY = config.cursorWebhookKey

  console.log('')
  console.log('   pointer-cms')
  console.log('  cursor: pointer;')
  console.log('')
  console.log(`  Dashboard: http://localhost:${port}`)
  console.log('')

  // Start the Nuxt dev server
  const { loadNuxt, buildNuxt } = await import('@nuxt/kit')
  const rootDir = resolve(__dirname, '..')

  const nuxt = await loadNuxt({
    rootDir,
    dev: true,
    overrides: {
      devServer: { port }
    }
  })

  await buildNuxt(nuxt)
  await nuxt.hooks.callHook('listen', port)
}

switch (command) {
  case 'dev':
    startDev()
    break
  case 'init':
    initConfig()
    break
  case 'build':
    console.log('Building Pointer CMS for production...')
    // TODO: Production build
    break
  case 'deploy':
    console.log('Deploying Pointer CMS to Cloudflare Workers...')
    // TODO: Deploy
    break
  default:
    console.log(`
  pointer-cms — What You Chat Is What You Get

  Usage:
    npx pointer-cms          Start dev dashboard (default)
    npx pointer-cms dev      Same as above
    npx pointer-cms init     Create .pointercms config file
    npx pointer-cms build    Build for production
    npx pointer-cms deploy   Build and deploy to Cloudflare Workers
    `)
}
