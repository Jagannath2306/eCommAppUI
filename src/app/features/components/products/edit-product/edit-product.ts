import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProductService } from '../../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../models/product.modal';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-edit-product',
  imports: [AppModal, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private productService = inject(ProductService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() productId!: string;
  product = signal<Product | null>(null);

  productForm!: FormGroup;
  isSubmitting = false;
  submitted = false;
  isEditMode = false;

  categories: any[] = [];
  tags: any[] = [];
  selectedFiles: File[] = [];
  previews: string[] = [];
  existingImages: string[] = [];
  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.getTags();
    this.getCategories();
    this.initForm();

    if (this.productId) {
      this.isEditMode = true;
      this.loadProductForEdit(this.productId);
    }
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(150)]],
      price: [null, [Validators.required, Validators.min(1)]],
      salePrice: [null, [Validators.required, Validators.min(1)]],
      categoryIds: [[], Validators.required],
      tagIds: [[], Validators.required],
      shortDetails: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imagePaths: [null], // Handled via selectedFiles logic
    });
  }

  getTags() {
    this.productService.getTags().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.tags = res.data;
          this.cdr.detectChanges();
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  getCategories() {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.categories = res.data;
          this.cdr.detectChanges();
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  loadProductForEdit(id: string) {
    this.productService.getProductById(id).subscribe((res: any) => {
      if (res.success && res.data) {
        this.product.set(res.data);
        this.existingImages = res.data.imagePaths || [];
        this.productForm.patchValue({
          ...res.data,
          categoryIds: res.data.categoryIds.map((c: any) => c._id || c),
          tagIds: res.data.tagIds.map((t: any) => t._id || t),
        });
        this.cdr.detectChanges();
      } else {
        this.alert.error(res.message);
      }
    });
  }

  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
    this.previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previews.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  removeExistingImage(index: number) {
    this.existingImages.splice(index, 1);
  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) return;

    this.isSubmitting = true;
    const formData = new FormData();
    const val = this.productForm.value;

    // 1. APPEND THE PRODUCT ID (Required for the Update API)
    if (this.isEditMode && this.productId) {
      formData.append('id', this.productId);
    }

    Object.keys(val).forEach((key) => {
      if (key === 'categoryIds' || key === 'tagIds') {
        formData.append(key, (val[key] || []).join(','));
      } else if (key !== 'imagePaths') {
        formData.append(key, val[key] ?? '');
      }
    });

    this.selectedFiles.forEach((file) => formData.append('imagePaths', file));
    // Also send remaining existing images to backend
    formData.append('existingImages', JSON.stringify(this.existingImages));

    this.productService.updateProduct(formData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.toast.success(res.message);
      },
      error: (err: any) => {
        alert(err.error?.message);
         this.alert.error(err.error?.message);
        this.isSubmitting = false;
      },
    });
  }
}
