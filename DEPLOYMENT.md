# Deployment Guide

Complete guide for deploying create-stack projects to production.

## 🚀 Quick Deploy Options

### Option 1: Container Platforms (Recommended)

**Best for:** Docker-based deployments

Platforms: Railway, Fly.io, Render, Google Cloud Run, AWS ECS

### Option 2: Serverless

**Best for:** Next.js projects

Platforms: Vercel, Netlify

### Option 3: Traditional Hosting

**Best for:** VPS/dedicated servers

Platforms: DigitalOcean, AWS EC2, Hetzner

## 🐳 Docker Deployment

### Build Production Images

**Frontend:**
```bash
cd frontend
docker build -t my-app-frontend:latest .
```

**Backend:**
```bash
cd backend
docker build -t my-app-backend:latest .
```

### Docker Compose Production

**Create `docker-compose.prod.yml`:**
```yaml
version: '3.8'

services:
  frontend:
    image: my-app-frontend:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  backend:
    image: my-app-backend:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - FRONTEND_URL=https://your-domain.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:8080/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"]
      interval: 30s
      timeout: 3s
      retries: 3
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

**Deploy:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## ☁️ Platform-Specific Guides

### Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Initialize project:**
   ```bash
   railway init
   ```

3. **Deploy:**
   ```bash
   # Frontend
   cd frontend
   railway up

   # Backend
   cd ../backend
   railway up
   ```

4. **Add database:**
   ```bash
   railway add postgres
   ```

5. **Set environment variables:**
   ```bash
   railway variables set NODE_ENV=production
   ```

### Vercel (Next.js)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Environment variables:**
   - Go to Vercel dashboard → Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_BASE`, etc.

### Fly.io

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   fly auth login
   ```

2. **Create `fly.toml` (Frontend):**
   ```toml
   app = "my-app-frontend"

   [build]
     dockerfile = "Dockerfile"

   [[services]]
     internal_port = 80
     protocol = "tcp"

     [[services.ports]]
       handlers = ["http"]
       port = 80

     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443

   [env]
     NODE_ENV = "production"
   ```

3. **Deploy:**
   ```bash
   fly deploy
   ```

### Render

1. **Create `render.yaml`:**
   ```yaml
   services:
     - type: web
       name: my-app-frontend
       env: static
       buildCommand: npm run build
       staticPublishPath: dist
       envVars:
         - key: NODE_ENV
           value: production

     - type: web
       name: my-app-backend
       env: node
       buildCommand: npm install && npm run build
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: DATABASE_URL
           fromDatabase:
             name: my-app-db
             property: connectionString

   databases:
     - name: my-app-db
       databaseName: myapp
       user: myapp
   ```

2. **Push to GitHub and connect to Render**

## 🔐 Environment Variables

### Required for Production

**Frontend:**
```env
VITE_API_BASE=https://api.your-domain.com
NODE_ENV=production
```

**Backend:**
```env
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-domain.com
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Optional
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=https://api.your-domain.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Setting Environment Variables

**Railway:**
```bash
railway variables set KEY=value
```

**Vercel:**
```bash
vercel env add KEY production
```

**Fly.io:**
```bash
fly secrets set KEY=value
```

**Render:**
- Dashboard → Environment → Environment Variables

## 📊 CI/CD with GitHub Actions

The generated `.github/workflows/ci.yml` runs on every push:

- ✅ Lint frontend and backend
- ✅ Run tests
- ✅ Build applications
- ✅ Type checking (TypeScript)

**Add deployment step:**
```yaml
# Add to ci.yml
deploy:
  needs: [frontend, backend]
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
    - uses: actions/checkout@v4

    - name: Deploy to production
      run: |
        # Your deployment commands here
        # e.g., railway up, vercel --prod, etc.
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## 🗄️ Database Migration

### Postgres

**Using Docker:**
```bash
# Backup
docker exec -t your-db-container pg_dump -U user dbname > backup.sql

# Restore
docker exec -i your-db-container psql -U user dbname < backup.sql
```

**Using psql:**
```bash
# Export from dev
pg_dump -h localhost -U user dbname > migration.sql

# Import to production
psql -h production-host -U user dbname < migration.sql
```

### MongoDB

```bash
# Export
mongodump --uri="mongodb://localhost:27017/dbname"

# Import
mongorestore --uri="mongodb://production-host:27017/dbname" dump/
```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Use strong database passwords
- [ ] Enable HTTPS (all platforms do this automatically)
- [ ] Set CORS origins to production URLs
- [ ] Remove console.log statements (automatic with build config)
- [ ] Set secure cookie options (SameSite, Secure, HttpOnly)
- [ ] Enable rate limiting (add middleware)
- [ ] Set up database backups
- [ ] Use environment variables for all secrets
- [ ] Enable error monitoring (Sentry, LogRocket)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)

## 📈 Monitoring

### Health Checks

**Frontend:** `GET https://your-app.com/health`
**Backend:** `GET https://api.your-app.com/health`

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2025-10-02T12:00:00.000Z",
  "uptime": 123456,
  "environment": "production",
  "version": "1.0.0",
  "checks": {
    "memory": {
      "used": 45,
      "total": 512,
      "percentage": 8
    }
  }
}
```

### Kubernetes Health Checks

**Liveness:** `GET /health/live`
**Readiness:** `GET /health/ready`

### Logging

Add structured logging:

```typescript
// backend/src/lib/logger.ts
export const logger = {
  info: (msg: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', msg, ...meta, timestamp: new Date() }));
  },
  error: (msg: string, error?: any) => {
    console.error(JSON.stringify({ level: 'error', msg, error: error?.stack, timestamp: new Date() }));
  },
};
```

## 🚦 Performance Tips

### Frontend

- ✅ Enable compression (automatic with Nginx)
- ✅ Cache static assets (configured in nginx.conf)
- ✅ Use CDN for assets (Cloudflare, etc.)
- ✅ Enable HTTP/2 (automatic on most platforms)
- ✅ Lazy load routes and components

### Backend

- ✅ Enable response compression (add middleware)
- ✅ Use connection pooling (automatic with ORMs)
- ✅ Add Redis caching for frequent queries
- ✅ Set up database indexes
- ✅ Monitor query performance

## 💰 Cost Optimization

### Free Tiers Available

**Frontend:**
- Vercel: 100GB bandwidth/month
- Netlify: 100GB bandwidth/month
- Cloudflare Pages: Unlimited bandwidth

**Backend:**
- Railway: $5 credit/month (hobby)
- Render: 750 hours/month free tier
- Fly.io: 3 VMs free

**Database:**
- Railway: Free Postgres (500MB)
- Supabase: 500MB free
- PlanetScale: 5GB free

**Total:** Can run a complete stack for **$0-10/month** initially!

## 🔄 Rolling Updates

### Zero-downtime deployment:

1. Deploy new version to new container
2. Health check passes
3. Route traffic to new version
4. Gracefully shutdown old version

**Most platforms handle this automatically!**

## 📚 Platform Documentation

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Fly.io Docs](https://fly.io/docs/)
- [Netlify Docs](https://docs.netlify.com/)

## 🆘 Troubleshooting

### Build fails

- Check Node.js version (needs 20+)
- Verify all environment variables are set
- Check build logs for specific errors

### Database connection fails

- Verify DATABASE_URL is correct
- Check database is accessible from backend
- Verify database credentials
- Check firewall/security group settings

### CORS errors in production

- Set FRONTEND_URL in backend env vars
- Update CORS configuration to include production domain
- Check HTTPS is enabled

### Memory errors

- Increase container memory limit
- Check for memory leaks
- Monitor /health endpoint memory usage

---

**Need help?** Check the platform-specific documentation or open an issue on GitHub.
