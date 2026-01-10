import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { resetPasswordGuard } from './core/guards/reset-password.guard';
import { Login } from './features/components/auth/login/login';
import { Register } from './features/components/auth/register/register';
import { ForgotPassword } from './features/components/auth/forgot-password/forgot-password';
import { ResetPassword } from './features/components/auth/reset-password/reset-password';
import { Dashboard } from './features/components/dashboard/dashboard';

export const routes: Routes = [
  // Guest
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: 'reset-password',
    component: ResetPassword,
    canActivate: [resetPasswordGuard],
  },

  // Protected + Lazy
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/components/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES),
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
