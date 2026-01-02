/**
 * Environment variable validation
 * Ensures required environment variables are set before app starts
 */

const requiredEnvVars = [
  'VITE_API_BASE',
];

const optionalEnvVars = {
  'VITE_AUTH0_DOMAIN': 'Auth0 domain (required if using auth)',
  'VITE_AUTH0_CLIENT_ID': 'Auth0 client ID (required if using auth)',
  'VITE_STRIPE_PUBLIC_KEY': 'Stripe public key (required if using payments)',
};

export function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check optional variables (warn if missing)
  for (const [envVar, description] of Object.entries(optionalEnvVars)) {
    if (!import.meta.env[envVar]) {
      warnings.push(`${envVar}: ${description}`);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`  - ${v}`));
    console.error('\nCreate a .env file based on .env.example');
    throw new Error('Missing required environment variables');
  }

  if (warnings.length > 0 && import.meta.env.DEV) {
    console.warn('⚠️  Optional environment variables not set:');
    warnings.forEach(w => console.warn(`  - ${w}`));
  }

  if (import.meta.env.DEV) {
    console.log('✅ Environment variables validated');
  }
}

export const env = {
  apiBase: import.meta.env.VITE_API_BASE,
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
