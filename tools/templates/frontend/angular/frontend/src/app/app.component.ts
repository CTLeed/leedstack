import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app">
      <nav>
        <a routerLink="/">Home</a>
<% if (modules.contact) { -%>
        <a routerLink="/contact">Contact</a>
<% } -%>
<% if (modules.auth) { -%>
        <a routerLink="/login">Login</a>
<% } -%>
<% if (modules.admin) { -%>
        <a routerLink="/dashboard">Dashboard</a>
<% } -%>
      </nav>
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class AppComponent {
  title = '<%= appName %>';
}
