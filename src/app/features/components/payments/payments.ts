import { Component, inject, signal } from '@angular/core';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { ToastService } from '../../../shared/services/toast.service';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { PaymentList } from '../../models/payment.model';
import { TableColumn } from '../../../shared/models/table-column.model';
import { ViewPayment } from './view-payment/view-payment';

@Component({
  selector: 'app-payments',
  imports: [DataTable, HasPermissionDirective],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments {
private toast = inject(ToastService);
  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  payments = signal<PaymentList[]>([]);
  imageBaseUrl = signal('http://localhost:5000/');
  permissionModule: string = 'ORDER_PAYMENT';
  columns: TableColumn[] = [
    { key: 'transactionId', label: 'Transaction ID', sortable: true },
    { key: 'invoiceNo', label: 'Invoice No', sortable: true },
    { key: 'paymentStatus', label: 'Payment Status', sortable: true },
    { key: 'paymentType', label: 'Payment Type', sortable: true },
    { key: 'amount', label: 'Total Amount', sortable: true },
    { key: 'createdOn', label: 'Payment Date', sortable: true },
  ];

  ngOnInit() {
    this.getPayments();
  }
  getPayments() {
    this.paymentService.getPayments().subscribe({
      next: (res) => {
        if (res.success) {
          this.payments.set(res.data || []);
          this.payments.set(
            res.data.map((payment: any) => ({
              ...payment,
              paymentType: payment.paymentTypeId?.name,
              paymentStatus: payment.paymentStatusId?.name,
              invoiceNo: payment.orderId?.invoiceNo,
            })),
          );
        } else {
          this.payments.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }


  onView(payment: any) {
    const modalRef = this.modalService.open(ViewPayment, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.paymentId = payment._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getPayments();
      }
    });
  }
}
