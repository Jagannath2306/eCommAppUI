import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../../shared/services/toast.service';
import { OrderService } from '../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { OrderList } from '../../models/orders.modal';
import { TableColumn } from '../../../shared/models/table-column.model';
import { ViewOrder } from './view-order/view-order';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { UpdateOrder } from './update-order/update-order';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { TrackOrder } from './track-order/track-order';
@Component({
  selector: 'app-orders',
  imports: [DataTable, HasPermissionDirective,RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  private toast = inject(ToastService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  orders = signal<OrderList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'ORDER_LIST';
  columns: TableColumn[] = [
    { key: 'customerName', label: 'Customer Name', sortable: true },
    { key: 'invoiceNo', label: 'Invoice No', sortable: true },
    { key: 'status', label: 'Order Status', sortable: true },
    { key: 'paymentStatus', label: 'Payment Status', sortable: true },
    // { key: 'paymentType', label: 'Payment Type', sortable: true },
    { key: 'totalAmount', label: 'Total Amount', sortable: true },
    { key: 'createdOn', label: 'Order Date', sortable: true },
  ];

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders.set(res.data || []);
          console.log(res.data);
          this.orders.set(
            res.data.map((order: any) => ({
              ...order,
              customerName: `${order.customerId?.firstName} ${order.customerId?.lastName}`,
              status: order.orderStatusId?.name,
              paymentType: order.paymentTypeId?.name,
              paymentStatus: order.paymentStatusId?.name,
              productCount: order.items.length,
            })),
          );
        } else {
          this.orders.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  openCreateSize() {}

  onEdit(order: any) {
    const modalRef = this.modalService.open(UpdateOrder, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.orderId = order._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getOrders();
      }
    });
  }

  onView(order: any) {
    const modalRef = this.modalService.open(ViewOrder, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.orderId = order._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getOrders();
      }
    });
  }
  onTrack(order: any) {
    const modalRef = this.modalService.open(TrackOrder, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.orderId = order._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getOrders();
      }
    });
  }
}
