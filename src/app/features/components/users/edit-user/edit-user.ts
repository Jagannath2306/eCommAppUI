import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInfo, UserTypeList } from '../../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-user',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private userService = inject(UserService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  userTypes = signal<UserTypeList[]>([]);
  submitted = false;

  @Input() userId!: string;
  user = signal<UserInfo | null>(null);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    userTypeId: ['', [Validators.required]],
  });
  selectedType = toSignal(this.registerForm.get('userTypeId')!.valueChanges);
  get f() {
    return this.registerForm.controls;
  }
  ngOnInit() {
    this.getUser();
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
  getUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          console.log(res.data);
          // this.selectedType.set()
          this.patchForm(res.data);
        } else {
          this.user.set(null); // Clear data if success is false
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.user.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
  patchForm(user: UserInfo) {
    this.registerForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      userTypeId: user.userTypeId._id,
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const { firstName, lastName, userTypeId } = this.registerForm.value;

    this.userService.updateUser(this.userId!, firstName!, lastName!, userTypeId!).subscribe({
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
