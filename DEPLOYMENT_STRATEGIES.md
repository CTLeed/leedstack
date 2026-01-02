# Deployment Strategies

Choose the best deployment approach for your needs: **Monorepo** (everything together) or **Separate Repos** (frontend and backend split).

## 📊 Strategy Comparison

| Feature | Monorepo | Separate Repos |
|---------|----------|----------------|
| **Cost** | $5-15/month | **$0-5/month** ⭐ |
| **Simplicity** | ✅ Easier setup | More complex |
| **Free Tiers** | Limited | **Max free tiers** ⭐ |
| **CI/CD** | Single workflow | Two workflows |
| **Git Management** | One repo | Two repos |
| **Best For** | Small teams, MVPs | **Cost optimization** ⭐ |

## 💰 Cost Breakdown

### Monorepo Deployment

**Example: Railway (Full Stack)**
- Container for frontend + backend: **$5-10/month**
- Database (Postgres): **$5/month** (or free 500MB)
- **Total: $5-15/month**

### Separate Repos Deployment (Recommended for Free Tiers)

**Frontend (Static Hosting - FREE):**
- Vercel: Free (100GB bandwidth)
- Netlify: Free (100GB bandwidth)
- Cloudflare Pages: Free (unlimited bandwidth)
- GitHub Pages: Free

**Backend (Minimal Compute):**
- Railway: $5 credit/month (Free tier)
- Render: 750 hours/month (Free tier)
- Fly.io: 3 VMs free

**Database:**
- Supabase: 500MB free
- PlanetScale: 5GB free
- Railway: 500MB free

**Total: $0-5/month** ⭐

---

## 🎯 Strategy 1: Monorepo (Current Setup)

### Advantages
- ✅ Single repository to manage
- ✅ Shared dependencies and configs
- ✅ Easy local development
- ✅ Single CI/CD pipeline
- ✅ Atomic deployments

### When to Use
- MVPs and prototypes
- Small teams (1-5 developers)
- Rapid development
- Don't need to maximize free tiers

### Deployment Options

#### Option 1: Railway (Easiest)

```bash
# Deploy entire monorepo
railway up

# Railway automatically detects:
# - Frontend in /frontend
# - Backend in /backend
```

**Cost:** ~$5-10/month after free credit

#### Option 2: Render (Good free tier)

**Create `render.yaml`:**
```yaml
services:
  - type: web
    name: my-app-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist

  - type: web
    name: my-app-backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
```

**Cost:** Free for 750 hours/month

#### Option 3: Docker Compose (VPS)

```bash
# Use existing docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

**Cost:** $5-10/month (VPS from DigitalOcean, Hetzner)

---

## 🚀 Strategy 2: Separate Repos (Cost Optimized)

### Advantages
- ✅ **Maximize free tiers** (can be $0/month!)
- ✅ Independent scaling
- ✅ Smaller repositories
- ✅ Team separation (frontend/backend teams)
- ✅ Independent deployment cycles

### When to Use
- **Cost optimization** (use all free tiers)
- Larger teams with separate frontend/backend
- Need independent scaling
- Different deployment schedules

### Setup Instructions

#### Step 1: Split Your Project

**Create two repositories:**

```bash
# Original project
cd my-app

# Create frontend repo
cd ..
mkdir my-app-frontend
cp -r my-app/frontend/* my-app-frontend/
cp my-app/frontend/.* my-app-frontend/ 2>/dev/null || true
cd my-app-frontend
git init
git add .
git commit -m "Initial frontend"
git remote add origin https://github.com/username/my-app-frontend.git
git push -u origin main

# Create backend repo
cd ..
mkdir my-app-backend
cp -r my-app/backend/* my-app-backend/
cp my-app/backend/.* my-app-backend/ 2>/dev/null || true
cd my-app-backend
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/username/my-app-backend.git
git push -u origin main
```

#### Step 2: Frontend Deployment (FREE)

**Option A: Vercel (Recommended for Next.js)**

```bash
cd my-app-frontend
npm install -g vercel
vercel --prod
```

**Environment variables (Vercel dashboard):**
```env
VITE_API_BASE=https://your-backend.fly.dev
```

**Cost:** FREE (100GB bandwidth/month)

**Option B: Netlify (Great for React/Vue)**

```bash
cd my-app-frontend
npm install -g netlify-cli
netlify deploy --prod
```

**Cost:** FREE (100GB bandwidth/month)

**Option C: Cloudflare Pages (Unlimited bandwidth)**

```bash
# Connect GitHub repo in Cloudflare dashboard
# Build settings:
# Build command: npm run build
# Publish directory: dist
```

**Cost:** FREE (unlimited bandwidth!)

#### Step 3: Backend Deployment (Free/Cheap)

**Option A: Fly.io (3 VMs free)**

```bash
cd my-app-backend

# Install Fly CLI
curl -L https://fly.io/install.sh | sh
fly auth login

# Launch app
fly launch

# Set environment variables
fly secrets set DATABASE_URL=postgresql://...
fly secrets set FRONTEND_URL=https://your-app.vercel.app

# Deploy
fly deploy
```

**Cost:** FREE (3 VMs, 160GB outbound/month)

**Option B: Railway ($5 credit/month)**

```bash
cd my-app-backend
railway login
railway init
railway up

# Set environment variables
railway variables set FRONTEND_URL=https://your-app.vercel.app
```

**Cost:** FREE ($5 credit/month, ~500MB database)

**Option C: Render (750 hours free)**

```bash
# Connect GitHub repo in Render dashboard
# Build command: npm install && npm run build
# Start command: npm start
```

**Cost:** FREE (750 hours/month = 31 days continuous)

#### Step 4: Database (FREE)

**Option A: Supabase (Recommended)**

```bash
# Create project at https://supabase.com
# Get connection string from dashboard
```

**Cost:** FREE (500MB, 2GB bandwidth)

**Option B: PlanetScale**

```bash
# Create database at https://planetscale.com
# Get connection string
```

**Cost:** FREE (5GB storage, 1 billion row reads/month)

**Option C: Railway Postgres**

```bash
railway add postgres
railway variables
# Copy DATABASE_URL
```

**Cost:** FREE (500MB with $5 credit)

### GitHub Actions for Separate Repos

**Frontend CI (.github/workflows/deploy.yml):**
```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

**Backend CI (.github/workflows/deploy.yml):**
```yaml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Fly.io
        run: |
          curl -L https://fly.io/install.sh | sh
          flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

## 💡 Recommended Deployment Patterns

### For Maximum Free Tier Usage ($0/month)

```
Frontend: Cloudflare Pages (FREE, unlimited bandwidth)
Backend:  Fly.io (FREE, 3 VMs)
Database: Supabase (FREE, 500MB)

Total: $0/month ⭐
```

### For Best Developer Experience ($5/month)

```
Frontend: Vercel (FREE)
Backend:  Railway ($5/month)
Database: Railway Postgres (included)

Total: $5/month
```

### For Production/Scale ($15-30/month)

```
Frontend: Vercel Pro ($20/month)
Backend:  Railway ($10-15/month)
Database: Railway Postgres ($5-10/month)

Total: $35-45/month
```

---

## 🔧 Converting Monorepo to Separate Repos

If you started with a monorepo and want to split:

### Update Frontend Environment

**Old (monorepo):**
```env
VITE_API_BASE=http://localhost:8080
```

**New (separate):**
```env
# Local development
VITE_API_BASE=http://localhost:8080

# Production (add to Vercel/Netlify)
VITE_API_BASE=https://your-backend.fly.dev
```

### Update Backend CORS

**Add your frontend URL to allowed origins:**

```typescript
// backend/src/index.ts
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-app.vercel.app',        // Add this
  'https://your-app.netlify.app',       // Or this
  'https://your-app.pages.dev',         // Or this
  process.env.FRONTEND_URL
].filter(Boolean);
```

### CI/CD Updates

**Create separate workflows in each repo:**
- `.github/workflows/deploy.yml` in frontend repo
- `.github/workflows/deploy.yml` in backend repo

---

## 📊 Cost Comparison Examples

### Example 1: MVP/Prototype

**Monorepo on Railway:**
- Total: $5-10/month
- Pros: Easy, fast
- Cons: Limited free tier

**Separate on Free Tiers:**
- Total: $0/month
- Pros: Free!
- Cons: More setup

**Winner:** Separate (save $60-120/year)

### Example 2: Growing Startup

**Monorepo on Render:**
- Frontend + Backend: $7/month
- Database: $7/month
- Total: $14/month

**Separate:**
- Frontend (Vercel): Free
- Backend (Railway): $5/month
- Database (Supabase): Free
- Total: $5/month

**Winner:** Separate (save $108/year)

### Example 3: Production App

**Monorepo on Railway Pro:**
- Total: $25-35/month

**Separate on Premium Tiers:**
- Frontend (Vercel Pro): $20/month
- Backend (Railway): $15/month
- Database (Railway): $10/month
- Total: $45/month

**Winner:** Monorepo (simpler, cheaper at scale)

---

## 🎯 Decision Matrix

Choose **Monorepo** if:
- ✅ You want simplest deployment
- ✅ You're okay with $5-15/month
- ✅ You have a small team
- ✅ You want atomic deployments

Choose **Separate Repos** if:
- ✅ You want to maximize free tiers
- ✅ You want independent scaling
- ✅ You have separate frontend/backend teams
- ✅ You want to minimize costs

---

## 🚀 Quick Start Commands

### Monorepo (Current Setup)

```bash
# Railway
railway up

# Render
# Push to GitHub, connect in dashboard

# Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Separate Repos

```bash
# Frontend (Vercel)
cd frontend
vercel --prod

# Backend (Fly.io)
cd backend
fly launch
fly deploy

# Done! ($0/month)
```

---

## 📚 Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guides
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance optimization
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Code quality

---

**Bottom Line:** The current monorepo setup works great, but you can **easily split it into separate repos** to maximize free tiers and deploy for **$0/month**! 💰
