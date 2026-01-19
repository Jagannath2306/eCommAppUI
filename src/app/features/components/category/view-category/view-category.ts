import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryInfo } from '../../../models/category.model';

@Component({
  selector: 'app-view-category',
  imports: [AppModal, CommonModule, ReactiveFormsModule],
  templateUrl: './view-category.html',
  styleUrl: './view-category.css',
})
export class ViewCategory {
  private alert = inject(AlertService);
  private categoryService = inject(CategoryService);
  public activeModal = inject(NgbActiveModal);

  @Input() categoryId!: string;

  // Signal to hold category data
  category = signal<CategoryInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

          // Format the dates before setting the signal
          const formattedData = {
            ...data,
            createdOnFormatted: this.formatDateTime(data.createdOn),
            updatedOnFormatted: this.formatDateTime(data.updatedOn),
          };

          this.category.set(formattedData);

          // Set initial large image
          if (data.imagePaths && data.imagePaths.length > 0) {
            this.selectedImage.set(data.imagePaths[0]);
          }
        } else {
          this.category.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.category.set(null);
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
