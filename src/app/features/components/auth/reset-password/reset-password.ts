import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, timer, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);

  submitted = false;

  resendDisabled = signal(true);
  countdown = signal(60);
  private timer!: any;

 resetPasswordForm = this.fb.group(
  {
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(6)]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]
    ]
  },
  { validators: passwordMatchValidator  }
);


  get f() {
    return this.resetPasswordForm.controls;
  }

  ngOnInit() {
    this.startTimer();
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) return;

    const { otp, newPassword, confirmPassword } = this.resetPasswordForm.value;

    this.authService.resetPassword(otp!, newPassword!, confirmPassword!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.success(res.message);
          sessionStorage.removeItem('resetToken')
          this.router.navigate(['/login']);
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  resendOtp() {
    this.authService.resetOtp().subscribe({
      next: (res) => {
        if (res.success) {
          this.startTimer();
          this.toast.success(res.message);
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

 startTimer() {
  this.resendDisabled.set(true);
  this.countdown.set(60);

  clearInterval(this.timer);

  this.timer = setInterval(() => {
    this.countdown.update(v => v - 1);

    if (this.countdown() === 0) {
      this.resendDisabled.set(false);
      clearInterval(this.timer);
    }
  }, 1000);
}
}
