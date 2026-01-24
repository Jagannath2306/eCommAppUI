import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { ToastService } from '../../../shared/services/toast.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { SizeList } from '../../models/size.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { EditSize } from './edit-size/edit-size';
import { ViewSize } from './view-size/view-size';
import { CreateSize } from './create-size/create-size';
import { SizeService } from '../../services/size.service';
import { DataTable } from '../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-size',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './size.html',
  styleUrl: './size.css',
})
export class Size {
  private toast = inject(ToastService);
  private sizeService = inject(SizeService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  sizes = signal<SizeList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'PRODUCT_LIST';
  columns: TableColumn[] = [
    { key: 'name', label: 'Size', sortable: true },
    { key: 'code', label: 'code', sortable: true },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];

  ngOnInit() {
    this.getSizes();
  }
  getSizes() {
    this.sizeService.getSizes().subscribe({
      next: (res) => {
        if (res.success) {
          this.sizes.set(res.data || []);
        } else {
          this.sizes.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateSize() {
    const modalRef = this.modalService.open(CreateSize, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getSizes();
      }
    });
  }

  onEdit(size: any) {
    const modalRef = this.modalService.open(EditSize, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.sizeId = size._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getSizes();
      }
    });
  }

  async onDelete(size: any) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Size',
      message: 'Are you sure?',
      confirmText: 'Delete',
      confirmColor: '#f36716',
    });

    if (confirmed) {
      this.sizeService.deleteSize(size._id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
            this.getSizes();
          } else {
            this.sizes.set([]);
            this.alert.error(res.message);
          }
        },
        error: (err) => {
          this.alert.error(err.error.message);
        },
      });
    }
  }

  onView(size: any) {
    const modalRef = this.modalService.open(ViewSize, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.sizeId = size._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getSizes();
      }
    });
  }
}
