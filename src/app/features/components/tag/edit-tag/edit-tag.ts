import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { TagService } from '../../../services/tag.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from '../../../models/tag.model';

@Component({
  selector: 'app-edit-tag',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-tag.html',
  styleUrl: './edit-tag.css',
})
export class EditTag {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private tagService = inject(TagService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  @Input() tagId!: string;
  tags = signal<Tag | null>(null);
  imageBaseUrl = 'http://localhost:5000/';
  tagForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  get f() {
    return this.tagForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getTags();
  }

  initForm() {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getTags() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.tagService.getTagById(this.tagId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.tags.set(res.data);
          this.tagForm.patchValue(res.data);
        } else {
          this.tags.set(null);
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
    if (this.tagForm.invalid) return;

    const formData = {
      id: this.tagId,
      name: this.tagForm.value.name,
    };
    this.tagService.updateTag(formData).subscribe({
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
