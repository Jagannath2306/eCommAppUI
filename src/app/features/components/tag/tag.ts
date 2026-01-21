import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { TagService } from '../../services/tag.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { TagList } from '../../models/tag.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CreateTag } from './create-tag/create-tag';
import { EditTag } from './edit-tag/edit-tag';
import { ViewTag } from './view-tag/view-tag';

@Component({
  selector: 'app-tag',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  private toast = inject(ToastService);
  private tagService = inject(TagService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  tags = signal<TagList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'PRODUCT_LIST';
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagService.getTags().subscribe({
      next: (res) => {
        if (res.success) {
          this.tags.set(res.data || []);
        } else {
          this.tags.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateTag() {
    const modalRef = this.modalService.open(CreateTag, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getTags();
      }
    });
  }

  onEdit(tag: any) {
    const modalRef = this.modalService.open(EditTag, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.tagId = tag._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getTags();
      }
    });
  }

  async onDelete(tag: any) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Tag',
      message: 'Are you sure?',
      confirmText: 'Delete',
      confirmColor: '#f36716',
    });

    if (confirmed) {
      this.tagService.deleteTag(tag._id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
            this.getTags();
          } else {
            this.tags.set([]);
            this.alert.error(res.message);
          }
        },
        error: (err) => {
          this.alert.error(err.error.message);
        },
      });
    }
  }

  onView(tag: any) {
    const modalRef = this.modalService.open(ViewTag, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.tagId = tag._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getTags();
      }
    });
  }
}
