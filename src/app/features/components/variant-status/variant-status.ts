import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { VariantStatusService } from '../../services/variantStatus.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { VariantList } from '../../models/variantStatus.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CreateVariantStatus } from './create-variant-status/create-variant-status';
import { EditVariantStatus } from './edit-variant-status/edit-variant-status';
import { ViewVariantStatus } from './view-variant-status/view-variant-status';

@Component({
  selector: 'app-variant-status',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './variant-status.html',
  styleUrl: './variant-status.css',
})
export class VariantStatus {
private toast = inject(ToastService);
  private variantService = inject(VariantStatusService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  variant = signal<VariantList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'STATUS_LIST';
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'code', label: 'code', sortable: true },
    { key: 'color', label: 'Color', sortable: true },
    { key: 'isSelectable', label: 'Selectable', sortable: true },
    { key: 'isSellable', label: 'Sellable', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];

    ngOnInit() {
    this.getVariantStatus();
  }
  getVariantStatus() {
    this.variantService.getVariantStatus().subscribe({
      next: (res) => {
        if (res.success) {
          this.variant.set(res.data || []);
        } else {
          this.variant.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

   openCreateStatus() {
      const modalRef = this.modalService.open(CreateVariantStatus, {
        size: 'lg',
        backdrop: 'static',
      });
  
      modalRef.result.then((result) => {
        if (result) {
          this.getVariantStatus();
        }
      });
    }
  
    onEdit(status: any) {
      const modalRef = this.modalService.open(EditVariantStatus, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.statusId = status._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getVariantStatus();
        }
      });
    }
  
    async onDelete(status: any) {
      const confirmed = await this.confirmService.confirm({
        title: 'Delete Status',
        message: 'Are you sure?',
        confirmText: 'Delete',
        confirmColor: '#f36716',
      });
  
      if (confirmed) {
        this.variantService.deleteVariantStatus(status._id).subscribe({
          next: (res) => {
            if (res.success) {
              this.toast.success(res.message);
              this.getVariantStatus();
            } else {
              this.variant.set([]);
              this.alert.error(res.message);
            }
          },
          error: (err) => {
            this.alert.error(err.error.message);
          },
        });
      }
    }
  
    onView(status: any) {
      const modalRef = this.modalService.open(ViewVariantStatus, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.statusId = status._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getVariantStatus();
        }
      });
    }
}
