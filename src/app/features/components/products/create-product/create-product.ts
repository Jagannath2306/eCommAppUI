import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProductService } from '../../../services/product.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { Product } from '../../../models/product.modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-product',
  imports: [CommonModule, ReactiveFormsModule, AppModal, NgSelectModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {
  private toast = inject(ToastService);
  private productService = inject(ProductService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  productForm!: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;
  categories = [];
  tags = [];
  status = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.maxLength(150)]],
      price: [null, [Validators.required, Validators.min(0)]],
      salePrice: [null, [Validators.required, Validators.min(5)]],
      shortDetails: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryIds: [[], Validators.required],
      tagIds: [[], Validators.required],
      statusId: [[], Validators.required],
      imagePaths: [null, Validators.required],
    });
    this.getTags();
    this.getCategories();
    this.getStatus();
  }
 get f() {
    return this.productForm.controls;
  }
  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
    this.productForm.patchValue({ imagePaths: files.length > 0 ? files : null });
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
  getStatus() {
    this.productService.getStatus().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.status = res.data;
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
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.selectedFiles.length < 1) {
      alert('Please upload at least 1 image.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    const formValue = this.productForm.value;

    // Map all text values to FormData
    Object.keys(formValue).forEach((key) => {
      if (key === 'categoryIds' || key === 'tagIds') {
        // Send as comma-separated string for your backend sanitizer
        formData.append(key, formValue[key].join(','));
      } else if (key !== 'imagePaths') {
        formData.append(key, formValue[key]);
      }
    });

    // Append Files
    this.selectedFiles.forEach((file) => {
      formData.append('imagePaths', file);
    });
   
    this.productService.saveProduct(formData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.toast.success(res.message);
      },
      error: (err: any) => {
        alert(err.error?.message);
        this.isSubmitting = false;
      },
    });
  }
}
