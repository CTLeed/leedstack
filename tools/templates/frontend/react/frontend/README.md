# <%= AppName %> - Frontend

React frontend built with Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

Visit http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

See `.env.example` for required variables:

- `VITE_API_BASE` - Backend API URL (default: http://localhost:8080)
<% if (modules.auth) { -%>
- `VITE_AUTH0_DOMAIN` - Auth0 domain
- `VITE_AUTH0_CLIENT_ID` - Auth0 client ID
- `VITE_AUTH0_AUDIENCE` - Auth0 API audience
<% } -%>

## API Usage

Use the `apiFetch` helper to make API calls:

```javascript
import { apiFetch } from './lib/api';

const data = await apiFetch('/api/example');
```

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
<% if (modules.auth) { -%>
- **Auth0 SPA JS** - Authentication
<% } -%>
