<script lang="ts">
  import { onMount } from 'svelte';
  import { getToken, isAuthenticated } from '$lib/auth';
  import { goto } from '$app/navigation';

  let stats: any = null;
  let loading = true;
  let error = '';

  onMount(async () => {
    const auth = await new Promise<boolean>((resolve) => {
      const unsubscribe = isAuthenticated.subscribe(value => {
        resolve(value);
        unsubscribe();
      });
    });

    if (!auth) {
      goto('/login');
      return;
    }

    try {
      const API_BASE = import.meta.env.PUBLIC_API_BASE || 'http://localhost:8080';
      const token = await getToken();

      const response = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        stats = await response.json();
      } else {
        error = 'Failed to load stats';
      }
    } catch (err) {
      error = 'Error loading stats';
    } finally {
      loading = false;
    }
  });
</script>

<h1>Admin Dashboard</h1>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p style="color: red;">{error}</p>
{:else if stats}
  <div class="stats">
    <div class="stat-card">
      <h2>Users</h2>
      <p class="stat-value">{stats.users}</p>
    </div>

<% if (modules.contact) { -%>
    <div class="stat-card">
      <h2>Contact Messages</h2>
      <p class="stat-value">{stats.contacts}</p>
    </div>
<% } -%>
  </div>
{/if}

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .stat-card {
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .stat-card h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #666;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
  }
</style>
