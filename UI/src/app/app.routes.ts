import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent }
];
