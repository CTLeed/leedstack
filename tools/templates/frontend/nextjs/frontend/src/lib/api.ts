// API base URL from environment
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

/**
 * Fetch wrapper that automatically adds API base URL
 * @param endpoint - API endpoint (e.g., '/api/example')
 * @param options - Fetch options
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Example usage in components:
 *
 * import { apiFetch } from '@/lib/api';
 *
 * // GET request
 * const data = await apiFetch('/api/example');
 *
 * // POST request
 * const result = await apiFetch('/api/contact', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John', email: 'john@example.com' })
 * });
 */
