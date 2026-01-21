import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { ColorService } from '../../services/color.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { ColorList } from '../../models/color.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CreateColor } from './create-color/create-color';
import { EditColor } from './edit-color/edit-color';
import { ViewColor } from './view-color/view-color';

@Component({
  selector: 'app-color',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './color.html',
  styleUrl: './color.css',
})
export class Color {
  private toast = inject(ToastService);
  private colorService = inject(ColorService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  colors = signal<ColorList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'PRODUCT_LIST';
  columns: TableColumn[] = [
    { key: 'name', label: 'Color Name', sortable: true },
    { key: 'code', label: 'Code', sortable: true },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];

  ngOnInit() {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe({
      next: (res) => {
        if (res.success) {
          this.colors.set(res.data || []);
        } else {
          this.colors.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateColor() {
    const modalRef = this.modalService.open(CreateColor, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getColors();
      }
    });
  }

  onEdit(color: any) {
    const modalRef = this.modalService.open(EditColor, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.colorId = color._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getColors();
      }
    });
  }

  async onDelete(color: any) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Color',
      message: 'Are you sure?',
      confirmText: 'Delete',
      confirmColor: '#f36716',
    });

    if (confirmed) {
      this.colorService.deleteColor(color._id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
            this.getColors();
          } else {
            this.colors.set([]);
            this.alert.error(res.message);
          }
        },
        error: (err) => {
          this.alert.error(err.error.message);
        },
      });
    }
  }

  onView(color: any) {
    const modalRef = this.modalService.open(ViewColor, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.colorId = color._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getColors();
      }
    });
  }
}
