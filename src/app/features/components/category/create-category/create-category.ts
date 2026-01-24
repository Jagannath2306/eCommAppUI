import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ToastService } from '../../../../shared/services/toast.service';
import { CategoryService } from '../../../services/category.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';

@Component({
  selector: 'app-create-category',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory {
  private toast = inject(ToastService);
  private categoryService = inject(CategoryService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  categoryForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(4),Validators.pattern(/^[A-Z0-9]+$/)]]
    });
  }
  get f() {
    return this.categoryForm.controls;
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Update form value
      this.categoryForm.patchValue({ image: file });

      // Generate Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('title', this.categoryForm.value.title);
    formData.append('code', this.categoryForm.value.code);
    if (this.selectedFile) {
      formData.append('imagePath', this.selectedFile);
    }

    this.categoryService.saveCategory(formData).subscribe({
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
