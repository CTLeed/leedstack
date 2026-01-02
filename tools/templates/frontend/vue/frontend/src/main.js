import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './views/Home.vue';
<% if (modules.contact) { -%>
import Contact from './views/Contact.vue';
<% } -%>
<% if (modules.admin) { -%>
import Dashboard from './views/Dashboard.vue';
<% } -%>

const routes = [
  { path: '/', component: Home },
<% if (modules.contact) { -%>
  { path: '/contact', component: Contact },
<% } -%>
<% if (modules.auth) { -%>
  { path: '/login', component: () => import('./views/Login.vue') },
  { path: '/callback', component: () => import('./views/Callback.vue') },
<% } -%>
<% if (modules.admin) { -%>
  { path: '/dashboard', component: Dashboard },
<% } -%>
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
