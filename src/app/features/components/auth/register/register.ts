import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  submitted = false;

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
        ],
      ],
    },
    { validators: passwordMatchValidator }
  );

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password, confirmPassword } = this.registerForm.value;

    this.authService
      .register(firstName!, lastName!, email!, password!, confirmPassword!)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
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
}
