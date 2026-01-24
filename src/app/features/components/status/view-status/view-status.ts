import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../shared/services/alert.service';
import { StatusService } from '../../../services/status.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusInfo } from '../../../models/status.model';

@Component({
  selector: 'app-view-status',
  imports: [AppModal, CommonModule],
  templateUrl: './view-status.html',
  styleUrl: './view-status.css',
})
export class ViewStatus {
  private alert = inject(AlertService);
  private statusService = inject(StatusService);
  public activeModal = inject(NgbActiveModal);
  status = signal<StatusInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  @Input() statusId!: string;

  ngOnInit() {
    this.getSize();
  }

  getSize() {
    this.statusService.getStatusById(this.statusId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

          // Format the dates before setting the signal
          const formattedData = {
            ...data,
            createdOnFormatted: this.formatDateTime(data.createdOn),
            updatedOnFormatted: this.formatDateTime(data.updatedOn),
          };

          this.status.set(formattedData);

          // Set initial large image
          if (data.imagePaths && data.imagePaths.length > 0) {
            this.selectedImage.set(data.imagePaths[0]);
          }
        } else {
          this.status.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.status.set(null);
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
