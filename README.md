# Pointer CMS

**`cursor: pointer;`**

> What You Chat Is What You Get (WYCIWYG)

The AI-powered CMS that replaces editors with conversations. Describe your content changes in natural language — AI builds them in your codebase.

## Quick Start

```bash
npx pointer-cms
```

Opens the dashboard at `http://localhost:4321`. Sign in with GitHub, pick your repo, start chatting.

## How It Works

```
You chat → AI builds → Preview → Approve → Live
```

1. **Chat** — Describe what content you want in natural language
2. **Build** — Cursor Automations generates the code in your repo
3. **Preview** — Cloudflare Pages creates a preview of the branch
4. **Approve** — Review, approve, PR merges, production deploys

## Architecture

- **UI** — ChatGPT-style interface (Nuxt 4 + Tailwind CSS)
- **Auth** — GitHub OAuth
- **Database** — GitHub Issues (no actual database needed)
- **AI** — Cursor Automations (you pick the model)
- **Preview** — Cloudflare Pages (automatic per branch)
- **Your project** — Any framework. Any language. Any stack.

### Why GitHub Issues?

- **Conversations** = Issues with `pointer-cms` label
- **Messages** = Issue comments
- **Status** = Issue labels (`cms:draft`, `cms:preview`, `cms:merged`)
- **History** = Git history
- **Backup** = It's Git

## Setup

```bash
# Create config file
npx pointer-cms init
```

Configure your `.pointercms` file:

```json
{
  "githubClientId": "",
  "githubClientSecret": "",
  "cursorWebhookUrl": "",
  "cursorWebhookKey": "",
  "cloudflarePageProject": "",
  "port": 4321
}
```

Or use environment variables:

```bash
GITHUB_CLIENT_ID=xxx GITHUB_CLIENT_SECRET=xxx npx pointer-cms
```

## CLI

```bash
npx pointer-cms          # Start dashboard
npx pointer-cms dev      # Same as above
npx pointer-cms init     # Create config file
npx pointer-cms build    # Build for production
npx pointer-cms deploy   # Deploy to Cloudflare Workers
```

## Framework Agnostic

Works with any project: Next.js, Nuxt, Astro, Hugo, SvelteKit, plain HTML. The AI generates code in *your* project, in *your* framework, in *your* structure.

## License

MIT
