import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { Router } from '@angular/router';
import { VariantService } from '../../../services/variant.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductList } from '../../../models/product.modal';
import { ColorList } from '../../../models/color.model';
import { SizeList } from '../../../models/size.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { VariantList } from '../../../models/variantStatus.model';

@Component({
  selector: 'app-create-variant',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-variant.html',
  styleUrl: './create-variant.css',
})
export class CreateVariant {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private variantService = inject(VariantService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private activeModal = inject(NgbActiveModal);
  submitted = false;
  productList = signal<ProductList[]>([]);
  colorList = signal<ColorList[]>([]);
  sizeList = signal<SizeList[]>([]);
  statusList = signal<VariantList[]>([]);

  variantForm = this.fb.group({
    productId: ['', [Validators.required]],
    colorId: ['', [Validators.required]],
    sizeId: ['', [Validators.required]],
    statusId: ['', [Validators.required]],
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });

  get f() {
    return this.variantForm.controls;
  }

  selectedProduct = toSignal(this.variantForm.get('productId')!.valueChanges);
  selectedColor = toSignal(this.variantForm.get('colorId')!.valueChanges);
  selectedSize = toSignal(this.variantForm.get('sizeId')!.valueChanges);
  selectedStatus = toSignal(this.variantForm.get('sizeId')!.valueChanges);

  ngOnInit() {
    this.getProductList();
    this.getColorList();
    this.getSizeList();
    this.getStatusList();
  }
  getProductList() {
    this.variantService.getProductList().subscribe({
      next: (res) => {
        if (res.success) {
          this.productList.set(res.data || []);
        } else {
          this.productList.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  getColorList() {
    this.variantService.getColorList().subscribe({
      next: (res) => {
        if (res.success) {
          this.colorList.set(res.data || []);
        } else {
          this.colorList.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  getStatusList() {
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
  getSizeList() {
    this.variantService.getSizeList().subscribe({
      next: (res) => {
        if (res.success) {
          this.sizeList.set(res.data || []);
        } else {
          this.sizeList.set([]);
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
    if (this.variantForm.invalid) return;

    this.variantService.saveVariant(this.variantForm.value).subscribe({
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
