// API base URL from environment
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

/**
 * Fetch wrapper that automatically adds API base URL
 * @param {string} endpoint - API endpoint (e.g., '/api/example')
 * @param {RequestInit} options - Fetch options
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
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
