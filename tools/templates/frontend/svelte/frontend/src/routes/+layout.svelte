<script>
  import { page } from '$app/stores';
</script>

<div class="app">
  <nav>
    <a href="/">Home</a>
<% if (modules.contact) { -%>
    <a href="/contact">Contact</a>
<% } -%>
<% if (modules.auth) { -%>
    <a href="/login">Login</a>
<% } -%>
<% if (modules.admin) { -%>
    <a href="/dashboard">Dashboard</a>
<% } -%>
  </nav>

  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f0f0f0;
  }

  nav a {
    text-decoration: none;
    color: #333;
  }

  nav a:hover {
    text-decoration: underline;
  }

  main {
    flex: 1;
    padding: 2rem;
  }

  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
</style>
