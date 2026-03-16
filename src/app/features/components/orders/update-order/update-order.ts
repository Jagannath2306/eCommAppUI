import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { OrderService } from '../../../services/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../models/orders.modal';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-update-order',
  imports: [AppModal, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './update-order.html',
  styleUrl: './update-order.css',
})
export class UpdateOrder {
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private orderService = inject(OrderService);
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() orderId!: string;
  order = signal<Order | null>(null);
  statusList = signal<any[]>([]);
  imageBaseUrl = 'http://localhost:5000/';
  orderForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  submitted = false;

  get f() {
    return this.orderForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getOrders();
    this.getStatusList();
  }

  initForm() {
    this.orderForm = this.fb.group({
      orderStatus: ['', [Validators.required, Validators.minLength(1)]],
      _id: ['', [Validators.required]],
    });
  }

  getStatusList() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.orderService.getStatusList().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.statusList.set(res.data);
          console.log(res.data);
        } else {
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  getOrders() {
    // In a real app, you'd fetch this from a Service using an ID from the URL
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          const flattenedData = {
            ...res.data,
            customerName: `${res.data.customerId?.firstName} ${res.data.customerId?.lastName}`,
            orderStatus: res.data.orderStatusId?._id,
            paymentType: res.data.paymentTypeId?.name,
            paymentStatus: res.data.paymentStatusId?.name,
          };

          this.order.set(flattenedData);
          this.orderForm.patchValue(flattenedData);
        } else {
          this.order.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.orderForm.invalid) return;

    const formData = {
      orderId: this.orderId,
      statusId: this.orderForm.value.orderStatus,
      comment: this.getStatusComment(this.orderForm.value.orderStatus),
    };
    this.orderService.updateOrderStatus(formData).subscribe({
      next: (res: any) => {
        this.activeModal.close(res);
        this.toast.success(res.message);
      },
      error: (err: any) => {
        this.alert.error(err.message);
        this.submitted = false;
      },
    });
  }
getStatusComment(id: any): string {
  // 1. Find the status object from your Signal list using the ID
  const statusObj = this.statusList().find(s => s._id === id);
  
  if (!statusObj) return '';

  // 2. Map the name to your specific descriptions
  const statusName = statusObj.name?.toUpperCase();

  switch (statusName) {
    case 'PLACED':
      return 'Your order has been received.';
    case 'CONFIRMED':
      return 'Payment verified and order confirmed.';
    case 'PACKED':
      return 'Your order has been packed in the warehouse.';
    case 'SHIPPED':
      return 'Your order has been handed to a courier partner.';
    case 'OUT FOR DELIVERY':
      return 'Delivery agent is on the way.';
    case 'DELIVERED':
      return 'Order successfully delivered.';
    case 'CANCELED':
    case 'CANCELLED':
      return 'Your order has been cancelled.';
    default:
      return `Status: ${statusObj.name}`; // Fallback
  }
}
}
