import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CategoryList } from '../../models/category.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CategoryService } from '../../services/category.service';
import { EditCategory } from './edit-category/edit-category';
import { ViewCategory } from './view-category/view-category';
import { CreateCategory } from './create-category/create-category';

@Component({
  selector: 'app-category',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  private toast = inject(ToastService);
  categories = signal<CategoryList[]>([]);
  permissionModule: string = 'USER_LIST';
 imageBaseUrl = signal('http://localhost:5000/');
  columns: TableColumn[] = [
    { key: 'imagePath', label: 'Picture' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'slug', label: 'Slug', sortable: false },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
  ];
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories.set(res.data || []);
        } else {
          this.categories.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  openCreateCategory() {
    const modalRef = this.modalService.open(CreateCategory, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }
  
    onEdit(category: any) {
      const modalRef = this.modalService.open(EditCategory, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.categoryId = category._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getCategories();
        }
      });
    }
  
    async onDelete(category: any) {
      const confirmed = await this.confirmService.confirm({
        title: 'Delete Category',
        message: 'Are you sure?',
        confirmText: 'Delete',
        confirmColor: '#f36716',
      });
  
      if (confirmed) {
        this.categoryService.deleteCategory(category._id).subscribe({
          next: (res) => {
            if (res.success) {
              this.toast.success(res.message);
              this.getCategories();
            } else {
              this.categories.set([]);
              this.alert.error(res.message);
            }
          },
          error: (err) => {
            this.alert.error(err.error.message);
          },
        });
      }
    }
    onView(category: any) {
      const modalRef = this.modalService.open(ViewCategory, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.categoryId = category._id;
      modalRef.result.then((result) => {
        if (result) {
          this.getCategories();
        }
      });
    }
}
