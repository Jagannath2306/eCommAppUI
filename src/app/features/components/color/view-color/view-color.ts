import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../shared/services/alert.service';
import { ColorService } from '../../../services/color.service';
import { ColorInfo } from '../../../models/color.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-color',
  imports: [AppModal, CommonModule],
  templateUrl: './view-color.html',
  styleUrl: './view-color.css',
})
export class ViewColor {
private alert = inject(AlertService);
  private colorService = inject(ColorService);
  public activeModal = inject(NgbActiveModal);
  color = signal<ColorInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  @Input() colorId!: string;

  ngOnInit() {
    this.getColor();
  }

  getColor() {
    this.colorService.getColorById(this.colorId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

          // Format the dates before setting the signal
          const formattedData = {
            ...data,
            createdOnFormatted: this.formatDateTime(data.createdOn),
            updatedOnFormatted: this.formatDateTime(data.updatedOn),
          };

          this.color.set(formattedData);

          // Set initial large image
          if (data.imagePaths && data.imagePaths.length > 0) {
            this.selectedImage.set(data.imagePaths[0]);
          }
        } else {
          this.color.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.color.set(null);
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
