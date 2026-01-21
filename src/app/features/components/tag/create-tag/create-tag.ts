import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { ToastService } from '../../../../shared/services/toast.service';
import { TagService } from '../../../services/tag.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-tag',
  imports: [CommonModule, ReactiveFormsModule, AppModal],
  templateUrl: './create-tag.html',
  styleUrl: './create-tag.css',
})
export class CreateTag {
  private toast = inject(ToastService);
  private tagService = inject(TagService);
  private alert = inject(AlertService);
  private activeModal = inject(NgbActiveModal);
  tagForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}
  get f() {
    return this.tagForm.controls;
  }
  ngOnInit(): void {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }

    this.tagService.saveTag(this.tagForm.value).subscribe({
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
