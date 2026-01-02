import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
<% if (modules.contact) { -%>
import { ContactComponent } from './components/contact.component';
<% } -%>
<% if (modules.admin) { -%>
import { DashboardComponent } from './components/dashboard.component';
<% } -%>

export const routes: Routes = [
  { path: '', component: HomeComponent },
<% if (modules.contact) { -%>
  { path: 'contact', component: ContactComponent },
<% } -%>
<% if (modules.admin) { -%>
  { path: 'dashboard', component: DashboardComponent },
<% } -%>
];
