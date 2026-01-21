import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { ToastService } from '../../../../shared/services/toast.service';
import { ColorService } from '../../../services/color.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-color',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-color.html',
  styleUrl: './create-color.css',
})
export class CreateColor {
 private toast = inject(ToastService);
  private colorService = inject(ColorService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  colorForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}
  get f() {
    return this.colorForm.controls;
  }
  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      code: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern(/^#([0-9A-Fa-f]{6})$/)]],
    });
  }

   onSubmit(): void {
    this.submitted = true;
    if (this.colorForm.invalid) {
      this.colorForm.markAllAsTouched();
      return;
    }

    this.colorService.saveColor(this.colorForm.value).subscribe({
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
