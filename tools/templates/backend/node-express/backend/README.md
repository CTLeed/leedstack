# <%= AppName %> - Backend

Node.js + Express + TypeScript backend.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

Server runs on http://localhost:8080

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build

## Environment Variables

See `.env.example` for required variables:

- `APP_PORT` - Server port (default: 8080)
<% if (db === 'postgres' || db === 'mysql') { -%>
- `DATABASE_URL` - Database connection string
<% } else if (db === 'mongodb') { -%>
- `DATABASE_URL` - MongoDB connection string
<% } -%>
<% if (modules.auth) { -%>
- `AUTH0_DOMAIN` - Auth0 domain
- `AUTH0_AUDIENCE` - Auth0 API audience
<% } -%>

## API Routes

- `GET /health` - Health check endpoint
- `GET /api/example` - Example API route
<% if (modules.contact) { -%>
- `POST /api/contact` - Submit contact form
<% } -%>
<% if (modules.admin) { -%>
- `GET /api/admin/stats` - Admin statistics (requires auth)
<% } -%>
<% if (modules.payments) { -%>
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /stripe/webhook` - Stripe webhook handler
<% } -%>

## Tech Stack

- **Node.js ≥20** - Runtime
- **Express 5** - Web framework
- **TypeScript** - Type safety
<% if (db === 'postgres' || db === 'mysql') { -%>
- **Prisma** - Database ORM
<% } else if (db === 'mongodb') { -%>
- **Mongoose** - MongoDB ODM
<% } -%>
<% if (modules.auth) { -%>
- **jose** - JWT validation
<% } -%>
