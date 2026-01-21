import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { AlertService } from '../../../../shared/services/alert.service';
import { TagService } from '../../../services/tag.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TagInfo } from '../../../models/tag.model';

@Component({
  selector: 'app-view-tag',
  imports: [AppModal, CommonModule],
  templateUrl: './view-tag.html',
  styleUrl: './view-tag.css',
})
export class ViewTag {
 private alert = inject(AlertService);
  private tagService = inject(TagService);
  public activeModal = inject(NgbActiveModal);
  tag = signal<TagInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  @Input() tagId!: string;

  ngOnInit() {
    this.getTag();
  }

  getTag() {
    this.tagService.getTagById(this.tagId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

          // Format the dates before setting the signal
          const formattedData = {
            ...data,
            createdOnFormatted: this.formatDateTime(data.createdOn),
            updatedOnFormatted: this.formatDateTime(data.updatedOn),
          };

          this.tag.set(formattedData);

          // Set initial large image
          if (data.imagePaths && data.imagePaths.length > 0) {
            this.selectedImage.set(data.imagePaths[0]);
          }
        } else {
          this.tag.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.tag.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
  formatDateTime = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const datePart = d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const timePart = d
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      .toLowerCase();
    return `${datePart} at ${timePart}`;
  };
}
