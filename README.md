# hello-nextjs

Base template for customer projects. Built on Next.js 16 with App Router, Drizzle ORM, Neon, and a typed env layer. Ships with a working contact form, i18n (IT/EN), auth, email delivery, error tracking, and structured logging — ready to rename and deploy.

> Local coding-agent notes can live in ignored `AGENTS.md` / `ai/` files, but they are not part of the committed template.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| UI components | shadcn/ui |
| Database | Neon (PostgreSQL serverless) |
| ORM | Drizzle ORM |
| Forms | React Hook Form + Zod |
| Auth | Better Auth (email+password, Drizzle adapter) |
| Email | Resend |
| Error tracking | Sentry |
| Logging | Pino |
| i18n | next-intl v4 (IT default, EN at `/en`) |
| Formatter | Biome |
| Linter | ESLint (react-hooks, @next/next, jsx-a11y, @typescript-eslint) |
| Node.js | 22.x |

---

## Prerequisites

Create accounts and collect credentials before running setup:

- **Neon** — create a project; copy the connection string from the dashboard. Create a `staging` branch in addition to `main`.
- **Resend** — create an API key; verify the sender domain you plan to use for `CONTACT_FROM_EMAIL`.
- **Sentry** — create a Next.js project; copy the DSN.
- **Better Auth** — no external account needed; generate a secret with `openssl rand -hex 32`.
- Node.js 22.x installed locally (`node -v` to verify).

---

## Setup — new project from this template

```bash
# 1. Clone or use "Use this template" on GitHub, then install dependencies
npm ci

# 2. Copy the env file and fill in every value (see Environment Variables below)
cp .env.example .env.local

# 3. Run the database migrations
npm run db:migrate

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

`.env.example` is the canonical reference — it is committed to the repo and documents every variable. Copy it to `.env.local` (never commit `.env.local`).

| Variable | Required | Description |
|---|---|---|
| `APP_ENV` | Yes | App environment: `development`, `staging`, or `production` |
| `ENABLE_SENTRY_DEBUG_ROUTE` | No | Enables `/debug/sentry` in staging for temporary Sentry smoke tests. Defaults to `false`; ignored in production |
| `DATABASE_URL` | Yes | Neon connection string with `?sslmode=require` |
| `RESEND_API_KEY` | Yes | Resend API key |
| `CONTACT_EMAIL` | Yes | Address that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Yes | Sender address — must match a verified Resend domain |
| `SENTRY_DSN` | Yes | Canonical Sentry DSN used by server, edge, and browser initialization |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | No | Required only where `next build` should upload Sentry source maps |
| `BETTER_AUTH_SECRET` | Yes | Random secret ≥ 32 chars (`openssl rand -hex 32`) |
| `BETTER_AUTH_URL` | Yes | Full origin URL of the app (e.g. `https://your-domain.com`) |
| `SITE_URL` | No | Canonical site URL used for metadataBase and sitemap URLs |
| `LOG_LEVEL` | No | Pino log level — defaults to `info` |

The app fails to boot if any required variable is missing or malformed. This is intentional — see `src/env/server.ts`.

---

## Development

```bash
npm run dev          # start dev server at http://localhost:3000
npm run lint         # Biome + ESLint
npm run lint:fix     # auto-fix Biome issues
npm run typecheck    # TypeScript — no emit
npm run build        # production build (runs after lint + typecheck in CI)
```

---

## Database

```bash
npm run db:generate  # generate a new migration from schema changes
npm run db:migrate   # apply pending migrations to the database in DATABASE_URL
npm run db:studio    # open Drizzle Studio
```

Schema lives in `src/db/schema.ts`. Migrations are output to `drizzle/` at the project root.

**Before running `db:migrate` on a non-empty table:** check whether pending migrations add `NOT NULL` columns without a `DEFAULT`. If the table already has rows, the migration will fail. See `drizzle/` for the SQL files.

---

## Testing

```bash
npm test             # Vitest unit + integration tests (watch-free)
npm run test:watch   # Vitest in watch mode
npm run test:e2e     # Playwright end-to-end tests
```

E2E tests require a running dev or preview server. Playwright is configured in `playwright.config.ts` and starts the dev server automatically.

---

## Deploy

The deployment target is an OVH VPS running Docker Swarm via Dokploy. The GitHub Actions CI pipeline runs in this order and must not be reordered:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

Configure the same required environment variables in Dokploy for staging and production. Use `APP_ENV=staging` for staging deployments and `APP_ENV=production` for production deployments.

---

## Customising the template

After cloning, the minimum set of changes for a new customer project:

1. Update `package.json` — change `name` and `version`.
2. Fill in `messages/en.json` and `messages/it.json` — replace `{{placeholder}}` values in the `HomePage` section.
3. Update `src/app/[locale]/layout.tsx` — set the correct `<title>` and metadata.
4. Populate all variables in `.env.local` (and the equivalent in your Dokploy service environment).
5. Point `CONTACT_EMAIL` and `CONTACT_FROM_EMAIL` to the client's addresses.
6. Run `npm run db:migrate` against the production Neon branch.

---

## Sentry smoke test

The template includes a temporary debug route:

```text
/debug/sentry
```

Behavior:

- `APP_ENV=development`: route is available; Sentry is disabled, so no events should be sent.
- `APP_ENV=staging`: route is available only with `ENABLE_SENTRY_DEBUG_ROUTE=true`; generated events should arrive in Sentry with `environment=staging`.
- `APP_ENV=production`: route always returns 404.

Recommended onboarding flow:

1. Configure Dokploy staging with `APP_ENV=staging`, `SENTRY_DSN=...`, and `ENABLE_SENTRY_DEBUG_ROUTE=true`.
2. Open `/debug/sentry`.
3. Trigger both client and server errors.
4. Confirm issues appear in Sentry with `environment=staging`.
5. Set `ENABLE_SENTRY_DEBUG_ROUTE=false` again.
