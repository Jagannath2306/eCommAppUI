import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-edit-category',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private categoryService = inject(CategoryService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() categoryId!: string;
  category = signal<Category | null>(null);
  imageBaseUrl = 'http://localhost:5000/';
  categoryForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  get f() {
    return this.categoryForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
  }

  getCategories() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.category.set(res.data);
          this.categoryForm.patchValue(res.data);

          // Set the initial preview to the existing server image
          if (res.data?.imagePath) {
            this.imagePreview = this.imageBaseUrl + res.data?.imagePath;
          }
        } else {
          this.category.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.categoryForm.patchValue({ image: this.selectedFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cdr.detectChanges(); // Force refresh for the preview
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.categoryForm.invalid) return;

    const formData = new FormData();
    formData.append('id', this.categoryId);
    formData.append('name', this.categoryForm.value.name);
    formData.append('title', this.categoryForm.value.title);

    if (this.selectedFile) {
      formData.append('imagePath', this.selectedFile);
    }

    this.categoryService.updateCategory(formData).subscribe({
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
