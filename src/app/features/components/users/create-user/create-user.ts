import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match';
import { CommonModule } from '@angular/common';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { UserService } from '../../../services/user.service';
import { UserTypeList } from '../../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private userService = inject(UserService);
  private activeModal = inject(NgbActiveModal);
  submitted = false;
  userTypes = signal<UserTypeList[]>([]);

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      userTypeId: ['', [Validators.required]],
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
  selectedType = toSignal(this.registerForm.get('userTypeId')!.valueChanges);
  ngOnInit() {
    this.getUserTypes();
  }
  getUserTypes() {
    this.userService.getUserTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.userTypes.set(res.data || []);
        } else {
          this.userTypes.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password, confirmPassword, userTypeId } =
      this.registerForm.value;

    this.authService
      .register(firstName!, lastName!, email!, password!, confirmPassword!, userTypeId!)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.activeModal.close(res);
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
}
