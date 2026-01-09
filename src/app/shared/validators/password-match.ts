import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mustMatch: true });
    return { mustMatch: true };
  }

  if (confirmPassword.hasError('mustMatch')) {
    const errors = { ...confirmPassword.errors };
    delete errors['mustMatch'];
    confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
  }

  return null;
};
