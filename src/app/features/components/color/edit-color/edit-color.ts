import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ColorService } from '../../../services/color.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Color } from '../../../models/color.model';

@Component({
  selector: 'app-edit-color',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-color.html',
  styleUrl: './edit-color.css',
})
export class EditColor {
private alert = inject(AlertService);
  private toast = inject(ToastService);
  private colorService = inject(ColorService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  @Input() colorId!: string;
  color = signal<Color | null>(null);
  imageBaseUrl = 'http://localhost:5000/';
  colorForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  get f() {
    return this.colorForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getColor();
  }

  initForm() {
    this.colorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      code: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern(/^#([0-9A-Fa-f]{6})$/)]],
    });
  }

  getColor() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.colorService.getColorById(this.colorId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.color.set(res.data);
          this.colorForm.patchValue(res.data);
        } else {
          this.color.set(null);
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
    if (this.colorForm.invalid) return;

    const formData = {
      id: this.colorId,
      name: this.colorForm.value.name,
      code: this.colorForm.value.code,
    };
    this.colorService.updateColor(formData).subscribe({
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
