#!/bin/bash

# Script to split monorepo into separate frontend and backend repositories
# Usage: ./scripts/split-repos.sh

set -e

echo "🔀 Splitting monorepo into separate repositories..."
echo ""

# Get project name from current directory
PROJECT_NAME=$(basename "$PWD")
FRONTEND_REPO="${PROJECT_NAME}-frontend"
BACKEND_REPO="${PROJECT_NAME}-backend"

# Confirm with user
echo "This will create two new directories:"
echo "  - ../$FRONTEND_REPO"
echo "  - ../$BACKEND_REPO"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Create frontend repo
echo ""
echo "📦 Creating frontend repository..."
cd ..
mkdir -p "$FRONTEND_REPO"
cd "$PROJECT_NAME"

# Copy frontend files
cp -r frontend/* "../$FRONTEND_REPO/"
cp -r frontend/.* "../$FRONTEND_REPO/" 2>/dev/null || true

# Copy shared files
cp .gitignore "../$FRONTEND_REPO/"
cp README.md "../$FRONTEND_REPO/README.md.bak"

# Initialize git
cd "../$FRONTEND_REPO"
rm -rf .git 2>/dev/null || true
git init
git add .
git commit -m "Initial commit: frontend"

echo "✅ Frontend repository created at ../$FRONTEND_REPO"

# Create backend repo
echo ""
echo "📦 Creating backend repository..."
cd "../$PROJECT_NAME"
mkdir -p "../$BACKEND_REPO"

# Copy backend files
cp -r backend/* "../$BACKEND_REPO/"
cp -r backend/.* "../$BACKEND_REPO/" 2>/dev/null || true

# Copy shared files
cp .gitignore "../$BACKEND_REPO/"
cp docker-compose.yml "../$BACKEND_REPO/" 2>/dev/null || true
cp README.md "../$BACKEND_REPO/README.md.bak"

# Initialize git
cd "../$BACKEND_REPO"
rm -rf .git 2>/dev/null || true
git init
git add .
git commit -m "Initial commit: backend"

echo "✅ Backend repository created at ../$BACKEND_REPO"

# Create instructions
cd "../$PROJECT_NAME"
cat > SPLIT_INSTRUCTIONS.md << 'EOF'
# Next Steps After Splitting Repositories

## 1. Create GitHub Repositories

```bash
# Create repos on GitHub, then:

# Frontend
cd ../PROJECT_NAME-frontend
git remote add origin https://github.com/USERNAME/PROJECT_NAME-frontend.git
git push -u origin main

# Backend
cd ../PROJECT_NAME-backend
git remote add origin https://github.com/USERNAME/PROJECT_NAME-backend.git
git push -u origin main
```

## 2. Update Environment Variables

### Frontend (.env)
```env
# Update API base URL to production backend
VITE_API_BASE=https://your-backend.fly.dev
```

### Backend (.env)
```env
# Add production frontend URL
FRONTEND_URL=https://your-app.vercel.app
```

## 3. Update CORS Configuration

### Backend (src/index.ts)
Add your production frontend URL to allowed origins:
```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-app.vercel.app',  // Add this
  process.env.FRONTEND_URL
].filter(Boolean);
```

## 4. Set Up CI/CD

Copy the appropriate deployment workflow:
```bash
# Frontend
cp .github/workflows/deploy-separate.yml.example .github/workflows/deploy.yml
# Edit and keep only frontend section

# Backend
cp .github/workflows/deploy-separate.yml.example .github/workflows/deploy.yml
# Edit and keep only backend section
```

## 5. Deploy

### Frontend (Vercel - FREE)
```bash
cd ../PROJECT_NAME-frontend
npm install -g vercel
vercel --prod
```

### Backend (Fly.io - FREE)
```bash
cd ../PROJECT_NAME-backend
curl -L https://fly.io/install.sh | sh
fly auth login
fly launch
fly deploy
```

### Database (Supabase - FREE)
1. Create project at https://supabase.com
2. Get connection string
3. Set in backend: `fly secrets set DATABASE_URL=postgresql://...`

## 6. Update Frontend with Backend URL

After deploying backend, update frontend env vars:
```bash
# Vercel
vercel env add VITE_API_BASE production
# Enter: https://your-backend.fly.dev
```

## Done! 🎉

Your app is now deployed separately:
- Frontend: https://your-app.vercel.app (FREE)
- Backend: https://your-backend.fly.dev (FREE)
- Database: Supabase (FREE)

**Total cost: $0/month**

See DEPLOYMENT_STRATEGIES.md for more details.
EOF

echo ""
echo "✅ Split complete!"
echo ""
echo "📝 Next steps written to: SPLIT_INSTRUCTIONS.md"
echo ""
echo "Your repositories:"
echo "  Frontend: ../$FRONTEND_REPO"
echo "  Backend:  ../$BACKEND_REPO"
echo ""
echo "Read SPLIT_INSTRUCTIONS.md for deployment steps."
