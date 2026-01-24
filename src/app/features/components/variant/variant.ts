import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { VariantList } from '../../models/variant.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { VariantService } from '../../services/variant.service';
import { CreateVariant } from './create-variant/create-variant';
import { EditVariant } from './edit-variant/edit-variant';
import { ViewVariant } from './view-variant/view-variant';

@Component({
  selector: 'app-variant',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './variant.html',
  styleUrl: './variant.css',
})
export class Variant {
  private toast = inject(ToastService);
  private variantService = inject(VariantService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  variants = signal<VariantList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'PRODUCT_LIST';
  columns: TableColumn[] = [
    { key: 'imagePath', label: 'Picture', sortable: false },
    { key: 'productName', label: 'Name', sortable: false },
    { key: 'colorName', label: 'Color', sortable: false },
    { key: 'size', label: 'Size', sortable: false },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'stock', label: 'Stock', sortable: true },
    { key: 'sku', label: 'SKU', sortable: false },
  ];

  ngOnInit() {
    this.getVariants();
  }

  getVariants() {
    this.variantService.getVariants().subscribe({
      next: (res) => {
        if (res.success) {
          this.variants.set(res.data || []);
        } else {
          this.variants.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateVariant() {
      const modalRef = this.modalService.open(CreateVariant, {
        size: 'lg',
        backdrop: 'static',
      });
  
      modalRef.result.then((result) => {
        if (result) {
          this.getVariants();
        }
      });
    }
  
    onEdit(variant: any) {
      const modalRef = this.modalService.open(EditVariant, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.variantId = variant._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getVariants();
        }
      });
    }
  
    async onDelete(variant: any) {
      const confirmed = await this.confirmService.confirm({
        title: 'Delete Color',
        message: 'Are you sure?',
        confirmText: 'Delete',
        confirmColor: '#f36716',
      });
  
      if (confirmed) {
        this.variantService.deleteVariant(variant._id).subscribe({
          next: (res) => {
            if (res.success) {
              this.toast.success(res.message);
              this.getVariants();
            } else {
              this.variants.set([]);
              this.alert.error(res.message);
            }
          },
          error: (err) => {
            this.alert.error(err.error.message);
          },
        });
      }
    }
  
    onView(variant: any) {
      const modalRef = this.modalService.open(ViewVariant, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.variantId = variant._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getVariants();
        }
      });
    }
}
