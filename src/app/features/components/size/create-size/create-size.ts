import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { ToastService } from '../../../../shared/services/toast.service';
import { SizeService } from '../../../services/size.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-size',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-size.html',
  styleUrl: './create-size.css',
})
export class CreateSize {
  private toast = inject(ToastService);
  private sizeService = inject(SizeService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  sizeForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}
  get f() {
    return this.sizeForm.controls;
  }
  ngOnInit(): void {
    this.sizeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.sizeForm.invalid) {
      this.sizeForm.markAllAsTouched();
      return;
    }

    this.sizeService.saveSize(this.sizeForm.value).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.toast.success(res.message);
      },
      error: (err: any) => {
        alert(err.error?.message);
        this.submitted = false;
      },
    });
  }
}
