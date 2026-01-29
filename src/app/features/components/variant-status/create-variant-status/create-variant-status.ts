import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { ToastService } from '../../../../shared/services/toast.service';
import { VariantStatusService } from '../../../services/variantStatus.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-variant-status',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-variant-status.html',
  styleUrl: './create-variant-status.css',
})
export class CreateVariantStatus {
  private toast = inject(ToastService);
  private variantService = inject(VariantStatusService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  statusForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;
  visibleList = signal([
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ]);
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}
  get f() {
    return this.statusForm.controls;
  }
  ngOnInit(): void {
    this.statusForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      code: ['', [Validators.required]],
      color: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          Validators.pattern(/^#([0-9A-Fa-f]{6})$/),
        ],
      ],
      description: ['', [Validators.required]],
      isSelectable: ['', [Validators.required]],
      isSellable: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }

    this.variantService.saveVariantStatus(this.statusForm.value).subscribe({
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
