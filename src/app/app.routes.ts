import { Routes } from '@angular/router';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { resetPasswordGuard } from './core/guards/reset-password.guard';

export const routes: Routes = [
  // Guest Routes (Show in the @else block)
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword , canActivate: [resetPasswordGuard]},

  // Protected Routes (Show in the @if block)
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  // Redirect empty path to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
