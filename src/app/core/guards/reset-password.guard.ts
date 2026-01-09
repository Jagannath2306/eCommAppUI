import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const resetPasswordGuard: CanActivateFn = () => {
  const router = inject(Router);

  // check if reset flow was initiated
  const token = sessionStorage.getItem('resetToken');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
