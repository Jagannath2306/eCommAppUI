import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../../shared/services/toast.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { ProductList } from '../../models/product.modal';
import { TableColumn } from '../../../shared/models/table-column.model';
import { CreateProduct } from './create-product/create-product';
import { EditProduct } from './edit-product/edit-product';
import { ViewProduct } from './view-product/view-product';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-products',
  imports: [HasPermissionDirective, DataTable],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private toast = inject(ToastService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  products = signal<ProductList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'PRODUCT_LIST';
  columns: TableColumn[] = [
    { key: 'imagePaths', label: 'Picture' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'price', label: 'Price' },
    { key: 'shortDetails', label: 'Description' },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'discount', label: 'Discount' },
    { key: 'isActive', label: 'Active', sortable: true },
  ];

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        if (res.success) {
          this.products.set(res.data || []);
        } else {
          this.products.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateProduct() {
    const modalRef = this.modalService.open(CreateProduct, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }

  onEdit(product: any) {
    const modalRef = this.modalService.open(EditProduct, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.productId = product._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }

  async onDelete(product: any) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete Product',
      message: 'Are you sure?',
      confirmText: 'Delete',
      confirmColor: '#f36716',
    });

    if (confirmed) {
      this.productService.deleteProduct(product._id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
            this.getProducts();
          } else {
            this.products.set([]);
            this.alert.error(res.message);
          }
        },
        error: (err) => {
          this.alert.error(err.error.message);
        },
      });
    }
  }

  onView(product: any) {
    const modalRef = this.modalService.open(ViewProduct, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.productId = product._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }
}
