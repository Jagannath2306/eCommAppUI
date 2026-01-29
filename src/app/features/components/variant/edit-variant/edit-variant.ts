import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { VariantService } from '../../../services/variant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VariantInfo } from '../../../models/variant.model';
import { VariantList } from '../../../models/variantStatus.model';

@Component({
  selector: 'app-edit-variant',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-variant.html',
  styleUrl: './edit-variant.css',
})
export class EditVariant {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private variantService = inject(VariantService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  submitted = false;

  @Input() variantId!: string;
  user = signal<VariantInfo | null>(null);
  statusList = signal<VariantList[]>([]);
  variantForm = this.fb.group({
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    statusId: ['', [Validators.required]],
  });

  get f() {
    return this.variantForm.controls;
  }

  ngOnInit() {
    this.getVariantStatus()
    this.getVariants();
  }
  getVariants() {
    this.variantService.getVariantById(this.variantId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.patchForm(res.data);
        } else {
          this.user.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.user.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
  getVariantStatus() {
    this.variantService.getStatusList().subscribe({
      next: (res) => {
        if (res.success) {
          this.statusList.set(res.data || []);
        } else {
          this.statusList.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  patchForm(variant: any) {
    this.variantForm.patchValue({
      price: variant.price,
      stock: variant.stock,
      statusId: variant.statusId,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.variantForm.invalid) return;

    const { price } = this.variantForm.value;

    const data = {
      id: this.variantId,
      price: this.variantForm.value.price,
      stock: this.variantForm.value.stock,
      statusId: this.variantForm.value.statusId,
    };

    this.variantService.updateVariant(data).subscribe({
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
