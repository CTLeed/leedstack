import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBase = 'http://localhost:8080'; // Configure via environment

  /**
   * Fetch wrapper that automatically adds API base URL
   */
  async fetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiBase}${endpoint}`;

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
   * constructor(private api: ApiService) {}
   *
   * async ngOnInit() {
   *   // GET request
   *   const data = await this.api.fetch('/api/example');
   *
   *   // POST request
   *   const result = await this.api.fetch('/api/contact', {
   *     method: 'POST',
   *     body: JSON.stringify({ name: 'John', email: 'john@example.com' })
   *   });
   * }
   */
}
