.PHONY: help install install-fast dev build clean db-up db-down db-reset setup

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: install db-up ## Complete setup (install + start database)
	@echo "✅ Setup complete! Run 'make dev' to start"

install-fast: ## Install dependencies in parallel (faster)
	@echo "📦 Installing dependencies in parallel..."
	@(cd frontend && npm install) & \
<% if (backend === 'node-express') { -%>
	(cd backend && npm install) & \
<% } else if (backend === 'python-fastapi') { -%>
	(cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt) & \
<% } else if (backend === 'java-spring') { -%>
	(cd backend && mvn clean install -T 1C) & \
<% } else if (backend === 'go-echo') { -%>
	(cd backend && go mod download) & \
<% } -%>
	wait
	@echo "✅ Dependencies installed (parallel)"

install: ## Install all dependencies (sequential)
	@echo "📦 Installing dependencies..."
	cd frontend && npm install
<% if (backend === 'node-express') { -%>
	cd backend && npm install
<% } else if (backend === 'python-fastapi') { -%>
	cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt
<% } else if (backend === 'java-spring') { -%>
	cd backend && mvn clean install
<% } else if (backend === 'go-echo') { -%>
	cd backend && go mod download
<% } -%>
	@echo "✅ Dependencies installed"

dev: ## Start development servers
	@echo "🚀 Starting development servers..."
	@echo "Run 'make db-up' first if database is not running"
<% if (backend === 'node-express') { -%>
	npm run dev
<% } else { -%>
	@echo "Start backend and frontend in separate terminals:"
	@echo "  Terminal 1: cd backend && <% if (backend === 'python-fastapi') { %>python -m app.main<% } else if (backend === 'java-spring') { %>mvn spring-boot:run<% } else if (backend === 'go-echo') { %>go run ./cmd/server<% } %>"
	@echo "  Terminal 2: cd frontend && npm run dev"
<% } -%>

build: ## Build for production
	@echo "🏗️  Building for production..."
	cd frontend && npm run build
<% if (backend === 'node-express') { -%>
	cd backend && npm run build
<% } else if (backend === 'python-fastapi') { -%>
	@echo "Python: No build step needed"
<% } else if (backend === 'java-spring') { -%>
	cd backend && mvn clean package
<% } else if (backend === 'go-echo') { -%>
	cd backend && go build -o bin/<%= appSlug %>-backend ./cmd/server
<% } -%>
	@echo "✅ Build complete"

db-up: ## Start database container
	@echo "🐳 Starting database..."
	docker compose up -d db
	@echo "⏳ Waiting for database to be ready..."
	@sleep 5
	@echo "✅ Database is ready"

db-down: ## Stop database container
	@echo "🛑 Stopping database..."
	docker compose down

db-reset: ## Reset database (WARNING: deletes all data)
	@echo "⚠️  This will delete all database data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		docker compose up -d db; \
		echo "✅ Database reset complete"; \
	fi

clean: ## Clean build artifacts
	@echo "🧹 Cleaning..."
	cd frontend && rm -rf node_modules dist build .next
<% if (backend === 'node-express') { -%>
	cd backend && rm -rf node_modules dist build
<% } else if (backend === 'python-fastapi') { -%>
	cd backend && rm -rf __pycache__ .pytest_cache venv
<% } else if (backend === 'java-spring') { -%>
	cd backend && mvn clean
<% } else if (backend === 'go-echo') { -%>
	cd backend && rm -rf bin
<% } -%>
	@echo "✅ Clean complete"
