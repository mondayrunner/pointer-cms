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

### 1. GitHub OAuth App

Create a GitHub App at [github.com/settings/apps](https://github.com/settings/apps):

- **Homepage URL:** your domain (e.g. `https://yourdomain.com` or `http://localhost:4321` for local dev)
- **Callback URL:** `<your domain>/api/auth/callback`
- **Webhook URL:** `<your domain>/auth`

Save the Client ID and Client Secret.

### 2. Cursor Automation

Pointer CMS uses [Cursor Automations](https://cursor.com/automations) to generate code. You need to set up an automation that receives webhook calls from Pointer CMS.

1. Go to [cursor.com/automations](https://cursor.com/automations)
2. Create a new automation for your project
3. Click **"+ Add Trigger"** → select **Webhook**
4. Select the **repository** this automation should work on
5. Copy the **Auth Header** and **API URL** — you'll need these for your `.pointercms` config:
   - API URL → `cursorWebhookUrl`
   - Auth Header → `cursorWebhookKey`
6. Under **Tools**, make sure the agent has **Git write** access so it can create branches and open pull requests
7. Enable **"Use Configured Environment"** under Cloud Agent Environment
8. Paste the following into the **Instructions** field:

```
You receive a payload from Pointer CMS with:
- `action` — always "generate"
- `repo` — the GitHub repository (owner/repo)
- `issue_number` — the GitHub issue number (this is the conversation)
- `prompt` — the user's content request in natural language
- `branch` — the branch to work on (e.g. pointer-cms/issue-42)

Your job:
1. Read the prompt to understand the requested content change.
2. Implement the change in this repository on the specified branch.
3. If the request is ambiguous or blocked, stop and explain what is missing.

Rules:
- Prefer small, focused changes.
- Respect the existing stack and conventions in this repo.
- Do not make unrelated refactors.
- Work on the branch specified in the payload.

After coding:
1. Verify the result as well as you reasonably can.
2. Open a pull request:
   - Use the prompt (or a summary of it) as PR title.
   - Include a brief summary of changes in the PR body.
3. Push to the branch so Cloudflare Pages can generate a preview.

Important:
- Always open a pull request — never push directly to main/master.
- Do not claim work is done if it is not.
```

### 3. Configure Pointer CMS

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

Or use environment variables (Nuxt uses `NUXT_` prefix to map to runtime config):

```bash
NUXT_GITHUB_CLIENT_ID=xxx
NUXT_GITHUB_CLIENT_SECRET=xxx
NUXT_PUBLIC_GITHUB_CLIENT_ID=xxx
NUXT_CURSOR_WEBHOOK_URL=xxx
NUXT_CURSOR_WEBHOOK_KEY=xxx
```

For Cloudflare Workers, set these as secrets via `wrangler secret put <NAME>`.

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
