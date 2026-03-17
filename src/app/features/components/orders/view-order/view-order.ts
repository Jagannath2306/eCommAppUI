import { Component, inject, Input, signal } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { OrderService } from '../../../services/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderInfo } from '../../../models/orders.modal';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-order',
  imports: [AppModal, CommonModule],
  templateUrl: './view-order.html',
  styleUrl: './view-order.css',
})
export class ViewOrder {
private alert = inject(AlertService);
  private OrderService = inject(OrderService);
  public activeModal = inject(NgbActiveModal);
  order = signal<OrderInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  @Input() orderId!: string;

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.OrderService.getOrderById(this.orderId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

        console.log(data);
          this.order.set(data);
        } else {
          this.order.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.order.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
  formatDateTime = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const datePart = d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const timePart = d
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      .toLowerCase();
    return `${datePart} at ${timePart}`;
  };

  // Helper for dynamic status colors
 getStatusClass(status: string): string {
  switch (status?.toUpperCase()) {
    case 'CONFIRMED':
      return 'bg-success text-white';

    case 'PENDING':
      return 'bg-warning text-dark';

    case 'CANCELLED':
      return 'bg-danger text-white';

    case 'PACKED':
      return 'bg-info text-white';

    case 'SHIPPED':
      return 'bg-primary text-white';

    case 'OUT_FOR_DELIVERY':
      return 'bg-warning text-dark';

    case 'DELIVERED':
      return 'bg-success text-white';

    case 'RETURNED':
      return 'bg-secondary text-white';

    case 'REFUNDED':
      return 'bg-dark text-white';

    default:
      return 'bg-light text-dark';
  }
}
}
