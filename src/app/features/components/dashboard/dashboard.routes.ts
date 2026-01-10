import { Routes } from '@angular/router';
import { User } from '../users/user/user';
import { UserPermission } from '../users/user-permission/user-permission';
import { UserActivity } from '../users/user-activity/user-activity';
import { UserDashboard } from '../user-dashboard/user-dashboard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UserDashboard,
  },
  {
    path: 'user',
    component: User,
  },
  {
    path: 'permission',
    component: UserPermission,
  },
  {
    path: 'activity',
    component: UserActivity,
  },
];
