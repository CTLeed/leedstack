# leedstack

> One-command scaffolder for full-stack web applications with pluggable stacks and modern defaults.

Generate production-ready full-stack applications in seconds with your choice of frontend, backend, database, and optional modules. The recommended default is React + Go (Echo) with Postgres.

## Features

- **60+ Stack Combinations**: Mix and match your preferred technologies
- **âš¡ Lightning Fast**: From zero to coding in <30 seconds with `make setup`
- **ðŸš€ Production-Ready**: Docker, CI/CD, testing, monitoring - all included
- **ðŸ§ª Automated Testing**: Vitest with example tests, coverage, and test UI
- **ðŸ”„ CI/CD Pipeline**: GitHub Actions workflow for automated testing and deployment
- **ðŸ³ Docker Support**: Multi-stage builds for optimized production images
- **ðŸ“Š Monitoring**: Health checks, memory tracking, K8s-compatible endpoints
- **Optimized Performance**: HMR <50ms, builds 20-40x faster with esbuild
- **Zero Memory Leaks**: Proper cleanup in all components and graceful shutdown
- **Most Popular Stacks**: React, Vue, Next.js, Python/FastAPI, Node/Express, and more
- **Auto-Configured Connectivity**: Frontend and backend pre-wired with correct ports and CORS
- **Modern Defaults**: SSR, code-splitting, tree-shaking, strict types
- **AI Chatbot Module**: Works out-of-box, upgrades with OpenAI/Anthropic API key
- **Auth0 Integration**: OIDC/PKCE flow with JWT validation
- **Stripe Payments**: Checkout + webhook handling
- **Code Quality Tools**: ESLint, Prettier, Error Boundaries pre-configured
- **Type-Safe**: TypeScript for frontends and Node backend

## Free vs Pro (Planned)

The npm package will always include the core scaffolding and base stacks.
Pro will unlock premium modules and templates (Auth, Payments, Admin, Chatbot, deployment presets).

**Pricing (planned)**: one-time purchase for Pro (no subscription).
**Licensing (planned)**: Pro access will use a simple license key file (e.g. `~/.leedstackrc`) with no heavy DRM.

FAQ: Will there be a subscription later? Possibly for updates and new templates, but the initial plan is a one-time purchase.

### Pro Module Compatibility (Current)

Frontends:

| Module | React | Vue | Next.js | Svelte | Angular |
| --- | --- | --- | --- | --- | --- |
| Auth | — | — | — | ✓ | — |
| Payments | — | — | — | ✓ | — |
| Admin | — | — | — | ✓ | — |
| Contact | — | — | — | ✓ | — |
| Chatbot | ✓ | — | — | — | — |

Backends:

| Module | node-express | python-fastapi | java-spring | go-echo |
| --- | --- | --- | --- | --- |
| Auth | ✓ | — | ✓ | — |
| Payments | ✓ | — | ✓ | — |
| Admin | — | — | ✓ | — |
| Contact | — | — | ✓ | — |
| Chatbot | ✓ | ✓ | — | — |

If your selected stack isn't listed above, that module will be unavailable until we add support.

### Pro Templates (ZIP Install)

If you purchase the Pro templates ZIP, install it like this:

```bash
# Create the local templates folder
mkdir -p ~/.leedstack/templates

# Unzip the download into that folder (replace the zip path)
unzip /path/to/leedstack-pro-templates.zip -d ~/.leedstack/templates
```

TODO: Add `leedstack login` and automated template downloads from a private registry.

## Quick Start

```bash
npx leedstack my-app \
  --frontend react \
  --backend go-echo \
  --db postgres
```

Then follow the printed instructions to start your app!

## âš¡ Fastest Setup

```bash
npx leedstack my-app --frontend react --backend go-echo --db postgres

cd my-app
make setup  # Installs everything + starts database (parallel)
make dev    # Start development servers
```

**Total time: ~30 seconds to fully operational!** ðŸš€

See [PERFORMANCE.md](./PERFORMANCE.md) for optimization details.

## ðŸ’° Deployment Options

**Monorepo (Simple):**
- Deploy everything together: ~$5-15/month
- Best for: MVPs, small teams, rapid development

**Separate Repos (Cost Optimized):**
- Deploy frontend and backend separately: **$0/month** possible!
- Frontend: Vercel/Netlify/Cloudflare (FREE)
- Backend: Fly.io/Railway (FREE tiers)
- Database: Supabase/PlanetScale (FREE)
- Best for: Maximizing free tiers, independent scaling

**Split your monorepo:**
```bash
./scripts/split-repos.sh
```

See [DEPLOYMENT_STRATEGIES.md](./DEPLOYMENT_STRATEGIES.md) for complete guide.

## Supported Stacks

### Frontends (5 options)
- **react** - Vite + React 19 (most popular!)
- **vue** - Vue 3.5 with Vite (lightweight and fast)
- **nextjs** - Next.js 15 (React with SSR/SSG)
- **svelte** - SvelteKit 5.x (innovative and performant)
- **angular** - Angular â‰¥19.0.0 (enterprise-ready)

### Backends (4 options)
- **go-echo** - Go 1.22+ with Echo framework (high performance, recommended)
- **node-express** - TypeScript + Express 5.x, Node 20+ (JavaScript ecosystem)
- **python-fastapi** - Python 3.11+ with FastAPI (great for AI/ML integration)
- **java-spring** - Spring Boot 3.3.x, Maven, Java 21 LTS (enterprise standard)

### Databases
- **postgres** - PostgreSQL 16+
- **mysql** - MySQL 8+
- **mongodb** - MongoDB 7+

### Optional Modules
- **--auth auth0** - Auth0 OIDC authentication
- **--payments stripe** - Stripe Checkout integration
- **contact** - Contact form with DB persistence
- **admin** - Protected admin dashboard with stats
- **chatbot** - AI chatbot (works out-of-box, upgrades with OpenAI/Anthropic API key)

## Usage

```bash
npx leedstack <appName> \
  --frontend <react|vue|nextjs|svelte|angular> \
  --backend <node-express|python-fastapi|java-spring|go-echo> \
  --db <postgres|mysql|mongodb> \
  [--auth auth0|none] \
  [--payments stripe|none] \
  [contact] [admin]
```

### Options

- `-f, --frontend <type>` (required) - Frontend framework
- `-b, --backend <type>` (required) - Backend stack
- `--db <type>` (required) - Database
- `--auth <type>` - Authentication (default: none)
- `--payments <type>` - Payments (default: none)
- Trailing arguments: Additional modules (`contact`, `admin`, `chatbot`)

## Examples

### Modern Python + React Stack with AI Chatbot
```bash
npx leedstack my-saas \
  --frontend react \
  --backend python-fastapi \
  --db postgres \
  --auth auth0 \
  --payments stripe \
  contact admin chatbot
```

### Recommended Default: React + Go + Postgres
```bash
npx leedstack my-app \
  --frontend react \
  --backend go-echo \
  --db postgres
```

### Vue + Node.js Blog
```bash
npx leedstack blog \
  --frontend vue \
  --backend node-express \
  --db mongodb \
  chatbot
```

### Next.js E-commerce
```bash
npx leedstack shop \
  --frontend nextjs \
  --backend node-express \
  --db postgres \
  --payments stripe

```

### Enterprise Java Stack
```bash
npx leedstack enterprise \
  --frontend angular \
  --backend java-spring \
  --db postgres \
  --auth auth0 \
  admin
```

## Generated Project Structure

```
my-app/
â”œâ”€â”€ docker-compose.yml          # Database container
â”œâ”€â”€ README.md                   # Project-specific docs
â”œâ”€â”€ .env.example                # Environment template
â”œâ”€â”€ frontend/                   # Frontend app
â”‚   â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ .env.example
â””â”€â”€ backend/                    # Backend API
    â”œâ”€â”€ src/
    â””â”€â”€ .env.example
```

## What's Included

### Base Features
- Docker Compose for database
- Health endpoints (`/actuator/health` or `/health`)
- CORS configuration for development
- Environment variable management
- Production-ready defaults

### With Auth0 (`--auth auth0`)
- Frontend: Login/logout flow, token management
- Backend: JWT validation via JWKS, protected routes
- Admin scope enforcement for `/api/admin/**` endpoints

### With Stripe (`--payments stripe`)
- Create Checkout sessions
- Webhook signature verification
- Payment success handling

### With Contact Module
- Contact form (name, email, message)
- Database persistence
- `/api/contact` endpoint

### With Admin Module
- Protected dashboard (requires `admin` scope)
- User and contact stats
- `/api/admin/stats` endpoint

## Technology Choices

### Version Policy
- Pin majors, float minors/patches using `^` (npm) or latest minor (Maven/Go)
- Enforce minimum runtimes via `engines` field

### Security
- JWT validation via JWKS (no custom crypto)
- CORS configurable per environment
- Secrets via environment variables only
- Admin routes protected by scope/permission

### Efficiency
- **Frontend**: SSR, code-splitting, lazy-loaded admin, minimal deps
- **Backend**: JSON-only APIs, no view engines
- **Docker**: Multi-stage builds, distroless/alpine images

## Requirements

- **Node.js** â‰¥20.0.0
- **Java** 21 LTS (for java-spring backend)
- **Go** â‰¥1.22 (for go-echo backend)
- **Docker** (for running databases)
- **Maven** (for java-spring backend)

## Development

### Running Generated Projects

1. **Start database**:
   ```bash
   docker compose up -d
   ```

2. **Backend**:
   ```bash
   cd backend
   # Java Spring
   mvn spring-boot:run

   # Node Express
   npm install && npm run dev

   # Go Echo
   go run ./cmd/server
   ```

3. **Frontend**:
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

### Environment Setup

See the generated `README.md` in your project for specific Auth0 and Stripe configuration instructions.

## Publishing to npm

If you want to publish this package:

1. Update `package.json`:
   - Change `name` if needed (must be unique on npm)
   - Set your `author` name and email
   - Update `repository`, `bugs`, `homepage` URLs

2. Create npm account: https://www.npmjs.com/signup

3. Login and publish:
   ```bash
   npm login
   npm publish
   ```

4. Users can then run:
   ```bash
   npx leedstack my-app --frontend react --backend node-express --db postgres
   ```

## License

MIT (c) Colby Leed

## Contributing

Issues and PRs welcome! Please ensure generated projects compile and run before submitting.

## Support

- Report issues: https://github.com/CTLeed/leedstack/issues
- Documentation: https://github.com/CTLeed/leedstack









