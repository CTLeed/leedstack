# Best Practices & Code Quality

create-stack generates projects with built-in best practices to prevent memory leaks, ensure code quality, and maintain clean codebases.

## 🛡️ Memory Leak Prevention

### React Components

#### ✅ Proper useEffect Cleanup

**All async operations in useEffect include cleanup:**

```javascript
useEffect(() => {
  let isMounted = true;

  // Async operation
  fetchData()
    .then(data => {
      if (isMounted) {
        setState(data);  // Only update if still mounted
      }
    });

  return () => {
    isMounted = false;  // Cleanup: prevent state updates after unmount
  };
}, []);
```

**Why:** Prevents "Can't perform a React state update on an unmounted component" warnings and memory leaks.

**Applied to:**
- `Home.jsx` - API connection test
- `Chatbot.jsx` - Chat message handling
- All components with async operations

#### ✅ useRef for Mutable Values

```javascript
const isMountedRef = useRef(true);

useEffect(() => {
  return () => {
    isMountedRef.current = false;
  };
}, []);
```

**Why:** `useRef` doesn't trigger re-renders and persists across renders, perfect for tracking mount status.

#### ✅ Event Listener Cleanup

```javascript
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);  // Always cleanup
  };
}, []);
```

**Why:** Prevents event listeners from accumulating and causing memory leaks.

### Backend (Node.js/Express)

#### ✅ Graceful Shutdown

```typescript
const server = app.listen(PORT);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
```

**Why:** Ensures connections are properly closed when the server stops, preventing resource leaks.

#### ✅ Connection Pooling

All database connections use proper pooling:

```javascript
// Connections are reused, not created per request
// Automatically managed by ORMs/drivers
```

**Why:** Prevents opening too many connections and exhausting database resources.

## 🎨 Code Quality Tools

### ESLint Configuration

**Frontend (.eslintrc.json):**
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**Key Rules:**
- ✅ `react-hooks/rules-of-hooks` - Enforces Rules of Hooks
- ✅ `react-hooks/exhaustive-deps` - Warns about missing dependencies
- ✅ `no-unused-vars` - Catches unused variables
- ✅ `no-console` - Warns about console.log (allows warn/error)

**Backend (.eslintrc.json):**
```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

**Key Rules:**
- ✅ TypeScript-specific linting
- ✅ Catches type errors early
- ✅ Enforces type safety

### Prettier Configuration

**Consistent formatting across the team:**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Benefits:**
- No formatting debates
- Auto-format on save (VS Code)
- Clean git diffs

## 🚨 Error Handling

### React Error Boundaries

**All apps include ErrorBoundary component:**

```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Features:**
- Catches React errors during rendering
- Prevents entire app crashes
- Shows user-friendly error message
- Displays error details in development
- Provides "Refresh Page" button

**Production behavior:**
- Clean error message
- No stack traces exposed
- Logs to console for debugging

**Development behavior:**
- Full error details
- Component stack trace
- Easy debugging

### Backend Error Handling

**Consistent error responses:**

```typescript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
```

**Best practices:**
- Never expose stack traces in production
- Log errors for debugging
- Return consistent error format

## 📋 Available Scripts

### Frontend

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix errors
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

### Backend

```bash
npm run dev           # Start dev server
npm run build         # Compile TypeScript
npm run start         # Run production build
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix errors
npm run format        # Format code
npm run type-check    # Check TypeScript types
```

## 🎯 Best Practices Checklist

### React Components

✅ **Always cleanup useEffect:**
```javascript
useEffect(() => {
  // ... async operation
  return () => {
    // Cleanup here
  };
}, []);
```

✅ **Include all dependencies:**
```javascript
useEffect(() => {
  doSomething(value);
}, [value]);  // Don't ignore ESLint warnings
```

✅ **Use functional setState for updates based on previous state:**
```javascript
setCount(prev => prev + 1);  // ✅ Good
setCount(count + 1);         // ❌ Can be stale
```

✅ **Memoize expensive calculations:**
```javascript
const expensiveValue = useMemo(() => {
  return computeExpensive(a, b);
}, [a, b]);
```

✅ **Use useCallback for function props:**
```javascript
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### Backend

✅ **Always use async/await with try/catch:**
```javascript
try {
  const data = await fetchData();
  res.json(data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed' });
}
```

✅ **Validate input:**
```javascript
if (!req.body.email || !isValidEmail(req.body.email)) {
  return res.status(400).json({ error: 'Invalid email' });
}
```

✅ **Use environment variables for secrets:**
```javascript
const apiKey = process.env.API_KEY;  // ✅ Good
const apiKey = 'hardcoded-key';      // ❌ Never
```

✅ **Set proper HTTP status codes:**
```javascript
res.status(200).json(data);     // Success
res.status(201).json(created);  // Created
res.status(400).json(error);    // Bad request
res.status(401).json(error);    // Unauthorized
res.status(404).json(error);    // Not found
res.status(500).json(error);    // Server error
```

## 🔍 Common Anti-Patterns to Avoid

### ❌ Forgetting Cleanup

```javascript
// BAD
useEffect(() => {
  fetchData().then(setData);
}, []);

// GOOD
useEffect(() => {
  let isMounted = true;
  fetchData().then(data => {
    if (isMounted) setData(data);
  });
  return () => { isMounted = false; };
}, []);
```

### ❌ Missing Dependencies

```javascript
// BAD
useEffect(() => {
  doSomething(value);
}, []);  // Missing 'value' dependency

// GOOD
useEffect(() => {
  doSomething(value);
}, [value]);
```

### ❌ Mutating State Directly

```javascript
// BAD
state.items.push(newItem);
setState(state);

// GOOD
setState(prev => ({
  ...prev,
  items: [...prev.items, newItem]
}));
```

### ❌ Not Handling Errors

```javascript
// BAD
const data = await api.fetch();
res.json(data);

// GOOD
try {
  const data = await api.fetch();
  res.json(data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to fetch data' });
}
```

### ❌ Exposing Secrets

```javascript
// BAD
const config = {
  apiKey: 'sk-1234567890'
};

// GOOD
const config = {
  apiKey: process.env.API_KEY
};
```

## 🧪 Testing Best Practices

### Unit Tests

```javascript
// Test components in isolation
test('renders without crashing', () => {
  render(<Component />);
});

// Test user interactions
test('calls handler on click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Integration Tests

```javascript
// Test API endpoints
test('GET /api/users returns users', async () => {
  const res = await request(app).get('/api/users');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('users');
});
```

## 📚 Additional Resources

### React

- [React Hooks Rules](https://react.dev/warnings/invalid-hook-call-warning)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

### TypeScript

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)

### Node.js

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## 🎁 What's Included

Every generated project includes:

✅ **Memory Leak Prevention:**
- useEffect cleanup in all components
- Graceful shutdown handlers
- Proper connection management

✅ **Code Quality Tools:**
- ESLint configuration
- Prettier configuration
- TypeScript strict mode
- Pre-configured linting scripts

✅ **Error Handling:**
- React Error Boundaries
- Backend error middleware
- Consistent error responses

✅ **Best Practices:**
- React Hooks best practices
- TypeScript type safety
- Async/await error handling
- Environment variable management

✅ **Development Tools:**
- Format on save (VS Code)
- Auto-fix on save (ESLint)
- Type checking
- Hot module replacement

---

**Result:** Clean, maintainable, production-ready code from day one! ✨
