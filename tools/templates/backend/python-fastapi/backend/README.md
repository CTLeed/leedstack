# <%= AppName %> - Backend

Python + FastAPI backend.

## Quick Start

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env

# Start development server
python -m app.main
```

Server runs on http://localhost:8080

API documentation available at http://localhost:8080/docs

## Available Commands

- `python -m app.main` - Start development server
- `uvicorn app.main:app --reload` - Alternative dev server command
- `uvicorn app.main:app --host 0.0.0.0 --port 8080` - Production server

## Environment Variables

See `.env.example` for required variables:

- `APP_PORT` - Server port (default: 8080)
- `DATABASE_URL` - Database connection string
<% if (modules.auth) { -%>
- `AUTH0_DOMAIN` - Auth0 domain
- `AUTH0_AUDIENCE` - Auth0 API audience
<% } -%>

## API Routes

FastAPI automatically generates interactive API docs at `/docs`.

Available endpoints:
- `GET /health` - Health check endpoint
- `GET /api/example` - Example API route
<% if (modules.contact) { -%>
- `POST /api/contact` - Submit contact form
<% } -%>
<% if (modules.admin) { -%>
- `GET /api/admin/stats` - Admin statistics (requires auth)
<% } -%>

## Tech Stack

- **Python ≥3.11** - Runtime
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
<% if (db === 'postgres' || db === 'mysql') { -%>
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
<% } else if (db === 'mongodb') { -%>
- **Motor** - Async MongoDB driver
<% } -%>
