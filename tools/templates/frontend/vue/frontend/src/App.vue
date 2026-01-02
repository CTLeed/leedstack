<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
<% if (modules.contact) { -%>
      <router-link to="/contact">Contact</router-link>
<% } -%>
<% if (modules.auth) { -%>
      <router-link to="/login">Login</router-link>
<% } -%>
<% if (modules.admin) { -%>
      <router-link to="/dashboard">Dashboard</router-link>
<% } -%>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
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

nav a:hover,
nav a.router-link-active {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>
