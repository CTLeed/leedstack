# Frontend-Backend Connectivity Guide

This document explains how create-stack automatically configures frontend-backend communication with proper ports and CORS.

## 📡 Default Configuration

### Port Assignments

- **Frontend**: `5173` (Vite default) or `3000` (Next.js default)
- **Backend**: `8080` (all backend types)
- **Database**: Varies by type
  - PostgreSQL: `5432`
  - MySQL: `3306`
  - MongoDB: `27017`

### Environment Variables

All generated projects include `.env.example` files with pre-configured API URLs.

**Frontend `.env.example`:**
```bash
# React, Vue, Svelte (Vite-based)
VITE_API_BASE=http://localhost:8080

# Next.js
NEXT_PUBLIC_API_BASE=http://localhost:8080

# Angular
NG_APP_API_BASE=http://localhost:8080
```

**Backend `.env.example`:**
```bash
APP_PORT=8080
FRONTEND_URL=http://localhost:5173  # Optional, for production
```

## 🔒 CORS Configuration

Each backend is pre-configured with CORS to allow requests from the frontend.

### Node/Express

```javascript
const allowedOrigins = [
  'http://localhost:5173',  // Vite (React, Vue, Svelte)
  'http://localhost:3000',  // Next.js
  process.env.FRONTEND_URL  // Production
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Python/FastAPI

```python
allowed_origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",  # Next.js
    os.getenv("FRONTEND_URL", "")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Java/Spring Boot

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "http://localhost:3000"
    ));

    String frontendUrl = System.getenv("FRONTEND_URL");
    if (frontendUrl != null && !frontendUrl.isEmpty()) {
        configuration.addAllowedOrigin(frontendUrl);
    }

    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);

    // ... register configuration
}
```

### Go/Echo

```go
allowedOrigins := []string{
    "http://localhost:5173",
    "http://localhost:3000",
}
if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
    allowedOrigins = append(allowedOrigins, frontendURL)
}

e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
    AllowOrigins:     allowedOrigins,
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"*"},
    AllowCredentials: true,
}))
```

## 🔌 API Helpers

Each frontend includes an `api` helper that automatically uses the configured API base URL.

### React

```javascript
import { apiFetch } from './lib/api';

// GET request
const data = await apiFetch('/api/example');

// POST request
const result = await apiFetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});
```

### Vue

```javascript
import { apiFetch } from '@/lib/api';

// Same usage as React
const data = await apiFetch('/api/example');
```

### Next.js

```typescript
import { apiFetch } from '@/lib/api';

// Fully typed
const data = await apiFetch<ResponseType>('/api/example');
```

### Svelte

```typescript
import { apiFetch } from '$lib/api';

const data = await apiFetch('/api/example');
```

### Angular

```typescript
constructor(private api: ApiService) {}

async ngOnInit() {
  const data = await this.api.fetch('/api/example');
}
```

## 🧪 Testing the Connection

Every generated project includes an example API route at `/api/example` that you can use to test connectivity.

### Start the Backend

```bash
cd backend

# Node/Express
npm install && npm run dev

# Python/FastAPI
pip install -r requirements.txt
python -m app.main

# Java/Spring
mvn spring-boot:run

# Go/Echo
go run ./cmd/server
```

You should see:
```
✅ Server running on http://localhost:8080
📍 API available at http://localhost:8080/api
🏥 Health check at http://localhost:8080/health
```

### Start the Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173` - the home page will automatically test the backend connection and display:
- ✅ Success message if connected
- ❌ Error message if backend is not running

## 🚀 Production Configuration

### Environment Variables

Set these in your production environment:

**Backend:**
```bash
APP_PORT=8080
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production  # For Node/Express
```

**Frontend:**
```bash
# Build-time variables
VITE_API_BASE=https://api.yourdomain.com
# or
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
```

### CORS Security

In production, CORS is automatically restricted to:
1. The domains specified in `allowedOrigins` array
2. The `FRONTEND_URL` environment variable

**Never use `allow_origins: ["*"]` in production!**

## 🐛 Troubleshooting

### CORS Errors

**Problem:** Browser console shows CORS error
```
Access to fetch at 'http://localhost:8080/api/example' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**Solution:**
1. Verify backend is running on port 8080
2. Check that frontend is running on port 5173 or 3000
3. Ensure backend CORS includes the frontend URL
4. Check browser DevTools Network tab for actual error

### Connection Refused

**Problem:** `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solution:**
1. Verify backend is running: `curl http://localhost:8080/health`
2. Check backend logs for startup errors
3. Ensure `.env` file exists in backend directory
4. Check firewall isn't blocking port 8080

### Wrong API URL

**Problem:** Frontend is calling wrong API URL

**Solution:**
1. Verify `.env` file in frontend directory
2. Restart frontend dev server after changing `.env`
3. Check browser DevTools Network tab to see actual URL being called

### 404 on API Routes

**Problem:** API returns 404 Not Found

**Solution:**
1. Verify the route exists in backend code
2. Check route is properly registered (imported and mounted)
3. Ensure route path matches exactly (case-sensitive)
4. For Java Spring, check controller scanning is working

## 📚 Additional Resources

- Frontend .env files: `frontend/.env.example`
- Backend .env files: `backend/.env.example`
- API utilities: `frontend/src/lib/api.*`
- Backend CORS config: Varies by stack (see above)
- Example routes: All backends have `/api/example` for testing

## 🔧 Customization

### Change Backend Port

1. Update `backend/.env`: `APP_PORT=3001`
2. Update `frontend/.env`: `VITE_API_BASE=http://localhost:3001`
3. Restart both servers

### Change Frontend Port

```bash
# Vite (React, Vue, Svelte)
npm run dev -- --port 4000

# Next.js
# Edit package.json: "dev": "next dev -p 4000"
```

Update backend CORS to include the new port.

### Add Additional CORS Origins

Edit the backend CORS configuration to include additional origins:

```javascript
// Node/Express
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://staging.yourdomain.com',  // Add staging
  process.env.FRONTEND_URL
].filter(Boolean);
```

---

**Summary:** create-stack automatically configures all frontend-backend connectivity with sensible defaults for development and production-ready CORS configuration. Just start both servers and everything works! ✨
