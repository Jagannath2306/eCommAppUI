import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { SizeService } from '../../../services/size.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Size } from '../../../models/size.model';

@Component({
  selector: 'app-edit-size',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-size.html',
  styleUrl: './edit-size.css',
})
export class EditSize {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private sizeService = inject(SizeService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() sizeId!: string;
  size = signal<Size | null>(null);
  imageBaseUrl = 'http://localhost:5000/';
  sizeForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  get f() {
    return this.sizeForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getSizes();
  }

  initForm() {
    this.sizeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getSizes() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.sizeService.getSizeById(this.sizeId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.size.set(res.data);
          this.sizeForm.patchValue(res.data);
        } else {
          this.size.set(null);
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
    if (this.sizeForm.invalid) return;

    const formData = {
      id: this.sizeId,
      name: this.sizeForm.value.name,
    };
    this.sizeService.updateSize(formData).subscribe({
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
