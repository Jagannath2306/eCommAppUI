import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { VariantStatusService } from '../../../services/variantStatus.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Variant } from '../../../models/variantStatus.model';

@Component({
  selector: 'app-edit-variant-status',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-variant-status.html',
  styleUrl: './edit-variant-status.css',
})
export class EditVariantStatus {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private variantService = inject(VariantStatusService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() statusId!: string;
  status = signal<Variant | null>(null);
  imageBaseUrl = 'http://localhost:5000/';
  statusForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;
  visibleList = signal([
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ]);
  get f() {
    return this.statusForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getStatus();
  }

  initForm() {
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

  getStatus() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.variantService.getVariantStatusById(this.statusId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.status.set(res.data);
          this.statusForm.patchValue(res.data);
        } else {
          this.status.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.statusForm.invalid) return;

    const formData = {
      id: this.statusId,
      name: this.statusForm.value.name,
      code: this.statusForm.value.code,
      color: this.statusForm.value.color,
      description: this.statusForm.value.description,
      isSelectable: this.statusForm.value.isSelectable,
      isSellable: this.statusForm.value.isSellable,
    };
    this.variantService.updateVariantStatus(formData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.toast.success(res.message);
      },
      error: (err: any) => {
        this.alert.error(err.message);
        this.submitted = false;
      },
    });
  }
}
