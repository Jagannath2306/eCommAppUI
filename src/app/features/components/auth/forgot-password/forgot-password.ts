import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);

  submitted = false;

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) return;

    const { email } = this.forgotPasswordForm.value;

    this.authService.forgotPassword(email!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.success(res.message);
          this.router.navigate(['/reset-password']);
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
}
