# Quality-of-Life Features

create-stack generates projects with extensive quality-of-life features to minimize setup time and maximize developer productivity.

## ✨ Zero-Configuration Features

### 1. **Stack-Specific .gitignore Files**

Every frontend and backend gets appropriate `.gitignore` files:

**React/Vue/Next.js:**
- Ignores `node_modules`, `dist`, `.env` files
- Excludes build artifacts
- VS Code and IDE folders properly configured

**Python/FastAPI:**
- Ignores `__pycache__`, `venv`, `.pyc` files
- Excludes pytest cache
- IDE settings preserved

**Java/Spring:**
- Ignores `target/`, Maven artifacts
- Class files excluded
- IDE project files properly managed

**Go/Echo:**
- Ignores compiled binaries
- Excludes test artifacts
- Proper workspace handling

### 2. **Root-Level Convenience Scripts**

Every project includes a root `package.json` with helpful scripts:

```bash
# Install ALL dependencies (frontend + backend) at once
npm run install:all

# Run BOTH servers in parallel (Node backends only)
npm run dev

# Build everything for production
npm run build
```

Individual scripts also available:
- `npm run dev:frontend` - Frontend only
- `npm run dev:backend` - Backend only
- `npm run install:frontend` - Frontend deps
- `npm run install:backend` - Backend deps

### 3. **Makefile for Common Tasks**

Every project includes a `Makefile` with helpful commands:

```bash
make help          # Show all available commands
make install       # Install all dependencies
make dev           # Start development servers
make build         # Build for production
make db-up         # Start database container
make db-down       # Stop database
make db-reset      # Reset database (WARNING: deletes data)
make clean         # Clean build artifacts
```

**Works on:**
- ✅ macOS/Linux (native)
- ✅ Windows (WSL, Git Bash, or make for Windows)

### 4. **VS Code Workspace Settings**

Auto-configured VS Code settings for optimal DX:

**`.vscode/settings.json`** includes:
- Format on save enabled
- Proper tab sizes (2 for JS/TS, 4 for Python/Java/Go)
- Excluded folders for better search performance
- Language-specific formatters configured
- Auto-fix on save for linting

**`.vscode/extensions.json`** recommends:
- ESLint, Prettier (JavaScript/TypeScript)
- Volar (Vue), Svelte extensions (Svelte)
- Python, Pylance, Black (Python)
- Java Extension Pack (Java)
- Go extension (Go)
- Docker extension (all stacks)

**First time opening in VS Code:**
1. VS Code prompts: "Do you want to install recommended extensions?"
2. Click "Install All"
3. Everything just works! ✨

### 5. **Enhanced Docker Compose**

Database containers include:

**Health Checks:**
- Database readiness detection
- Automatic retry logic
- Status monitoring

**Named Containers:**
```bash
docker ps
# Shows: my-app-db (not random hash)
```

**Persistent Volumes:**
- Data survives container restarts
- Named volumes for easy management

**Auto-restart:**
- Database restarts unless explicitly stopped
- No manual intervention needed

### 6. **Directory-Specific README Files**

**`frontend/README.md`** includes:
- Quick start commands
- Available npm scripts
- Environment variable documentation
- Tech stack overview
- API usage examples

**`backend/README.md`** includes:
- Language-specific setup (venv for Python, etc.)
- Available commands/scripts
- Environment variables
- API routes documentation
- Tech stack overview

### 7. **Improved Environment Files**

**`.env.example`** files include:
- All required variables
- Sensible defaults
- Comments explaining each variable
- URLs pre-configured for local development

**Variables auto-configured:**
- Database connection strings
- API base URLs
- Port assignments
- Framework-specific prefixes (VITE_, NEXT_PUBLIC_, etc.)

## 📋 Complete First-Time Setup

With all QoL features, setup is incredibly simple:

```bash
# Generate project
npx create-stack my-app --frontend react --backend python-fastapi --db postgres

cd my-app

# Option 1: Using Makefile (recommended)
make db-up          # Start database
make install        # Install all dependencies
make dev            # Start both servers

# Option 2: Using npm scripts
npm run install:all # Install all dependencies
npm run dev         # Start both servers (Node backends only)

# Option 3: Manual (works for all backends)
docker compose up -d
cd backend && [install deps] && [start server] &
cd frontend && npm install && npm run dev
```

**Open VS Code:**
```bash
code .
```
- Prompts to install extensions
- Formatting works immediately
- Linting works immediately
- Proper syntax highlighting

## 🎯 Developer Experience Improvements

### Before (Without QoL Features):

1. Generate project
2. Manually create `.gitignore` for frontend
3. Manually create `.gitignore` for backend
4. Install frontend dependencies
5. Install backend dependencies
6. Start database manually
7. Configure VS Code extensions
8. Configure formatters
9. Look up Docker commands
10. Remember all the port numbers
11. Debug CORS issues
12. Figure out environment variables

**Time: ~30-60 minutes** ⏱️

### After (With QoL Features):

1. Generate project
2. `make install && make db-up && make dev`
3. Open in VS Code, click "Install All" for extensions
4. Start coding!

**Time: ~2 minutes** ⚡

## 🚀 Production Benefits

### .gitignore Benefits:
- ✅ No accidental commits of `.env` files
- ✅ No `node_modules` in git (faster clones)
- ✅ Clean repository
- ✅ Smaller Docker builds (with .dockerignore)

### Makefile Benefits:
- ✅ Consistent commands across all projects
- ✅ Easy onboarding for new team members
- ✅ CI/CD integration (`make build`, `make test`)
- ✅ Works in any environment

### VS Code Settings Benefits:
- ✅ Consistent code formatting across team
- ✅ No "format on commit" conflicts
- ✅ Faster development (format on save)
- ✅ Better code quality (auto-fix linting)

### Docker Compose Benefits:
- ✅ Database always ready (health checks)
- ✅ Easy to replicate issues (reset database)
- ✅ No "works on my machine" problems
- ✅ Simple deployment to any container platform

## 📚 Additional Files Included

Every generated project includes:

1. **Root `.gitignore`** - Project-wide exclusions
2. **Frontend `.gitignore`** - Framework-specific
3. **Backend `.gitignore`** - Language-specific
4. **`package.json`** - Root convenience scripts
5. **`Makefile`** - Common task automation
6. **`docker-compose.yml`** - Enhanced database setup
7. **`.vscode/settings.json`** - Editor configuration
8. **`.vscode/extensions.json`** - Extension recommendations
9. **`frontend/README.md`** - Frontend documentation
10. **`backend/README.md`** - Backend documentation
11. **Root `README.md`** - Project overview

## 🎨 Customization

All QoL features are optional and can be modified:

### Don't want root `package.json`?
```bash
rm package.json
# Use `cd frontend && npm run dev` instead
```

### Don't use VS Code?
```bash
rm -rf .vscode
# Settings won't affect other editors
```

### Don't like Makefile?
```bash
rm Makefile
# Use Docker and npm commands directly
```

### Want different .gitignore rules?
```bash
# Edit .gitignore files as needed
# They're just starting points!
```

## 💡 Tips & Tricks

### Parallel Development

With root scripts, run frontend and backend together:
```bash
npm run dev
# Starts both servers in parallel
# Ctrl+C stops both
```

### Quick Database Reset

```bash
make db-reset
# Confirms before deleting data
# Rebuilds database from scratch
```

### Install Everything at Once

```bash
npm run install:all
# Installs frontend and backend dependencies
# One command, no cd required
```

### Check Available Make Commands

```bash
make help
# Shows all commands with descriptions
# Great for team onboarding
```

## 🏆 Summary

create-stack includes **12+ quality-of-life features** that save hours of setup time:

✅ Stack-specific .gitignore (no manual configuration)
✅ Root package.json with convenience scripts
✅ Makefile for common tasks
✅ VS Code workspace settings (format on save, etc.)
✅ VS Code extension recommendations
✅ Enhanced Docker Compose with health checks
✅ Frontend README with quick start
✅ Backend README with language-specific setup
✅ Pre-configured environment files
✅ Named Docker containers
✅ Persistent database volumes
✅ Auto-restart for database

**Result:** From `npx create-stack` to coding in under 2 minutes! ⚡
