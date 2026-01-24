import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { StatusService } from '../../services/status.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { StatusList } from '../../models/status.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CreateStatus } from './create-status/create-status';
import { EditStatus } from './edit-status/edit-status';
import { ViewStatus } from './view-status/view-status';

@Component({
  selector: 'app-status',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
private toast = inject(ToastService);
  private statusService = inject(StatusService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  status = signal<StatusList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'STATUS_LIST';
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'code', label: 'code', sortable: true },
    { key: 'color', label: 'Color', sortable: true },
    { key: 'isCustomerVisible', label: 'Visible', sortable: true },
    { key: 'isSellable', label: 'Sellable', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];

    ngOnInit() {
    this.getStatus();
  }
  getStatus() {
    this.statusService.getStatus().subscribe({
      next: (res) => {
        if (res.success) {
          this.status.set(res.data || []);
        } else {
          this.status.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

   openCreateStatus() {
      const modalRef = this.modalService.open(CreateStatus, {
        size: 'lg',
        backdrop: 'static',
      });
  
      modalRef.result.then((result) => {
        if (result) {
          this.getStatus();
        }
      });
    }
  
    onEdit(status: any) {
      const modalRef = this.modalService.open(EditStatus, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.statusId = status._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getStatus();
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
        this.statusService.deleteStatus(status._id).subscribe({
          next: (res) => {
            if (res.success) {
              this.toast.success(res.message);
              this.getStatus();
            } else {
              this.status.set([]);
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
      const modalRef = this.modalService.open(ViewStatus, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.statusId = status._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getStatus();
        }
      });
    }
}
