import { Component, computed, inject, Input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Internal Imports
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { AlertService } from '../../../../shared/services/alert.service';
import { OrderService } from '../../../services/order.service';
import { OrderInfo } from '../../../models/orders.modal';

// Use the interface locally or import it
export interface OrderStatus {
  _id: string;
  orderId: string;
  statusId: { _id: string; name: string; };
  comment: string;
  createdBy: { firstName: string; lastName: string; email: string; } | null;
  createdOn: string;
}

@Component({
  selector: 'app-track-order',
  standalone: true, // Recommended for modern Angular
  imports: [AppModal, CommonModule],
  templateUrl: './track-order.html',
  styleUrl: './track-order.css',
})
export class TrackOrder implements OnInit {
  // 1. Fixed Injection naming (camelCase)
  private alert = inject(AlertService);
  private orderService = inject(OrderService); 
  public activeModal = inject(NgbActiveModal);

  // 2. Decorator-based Input (Corrected for logic)
  @Input() orderId!: string;

  // 3. Signals
  order = signal<OrderInfo | null>(null);
  orderTimeline = signal<OrderStatus[]>([]);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; 

  private readonly statusSequence = [
    'PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'
  ];

  ngOnInit() {
    if (this.orderId) {
      this.getOrder();
    }
  }

  getOrder() {
    this.orderService.getOrderStatusHistoryById(this.orderId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // 4. Using .set() on the signal
          this.orderTimeline.set(res.data);
        } else {
          this.orderTimeline.set([]);
          this.alert.error(res.message || 'No data found');
        }
      },
      error: (err) => {
        this.orderTimeline.set([]);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }

  // 5. Computed Signals (Keep these, they are great for performance)
  currentStatus = computed(() => {
    const data = this.orderTimeline();
    return data.length > 0 ? data[data.length - 1].statusId.name : '';
  });

  reversedHistory = computed(() => [...this.orderTimeline()].reverse());

  isStepComplete(stepName: string): boolean {
    const status = this.currentStatus();
    const currentIndex = this.statusSequence.indexOf(status);
    const stepIndex = this.statusSequence.indexOf(stepName);
    
    if (status === 'CANCELLED' || status === 'REFUNDED') return false; 
    return stepIndex <= currentIndex && currentIndex !== -1;
  }

  getStatusTheme(status: string) {
    const themes: Record<string, string> = {
      'DELIVERED': 'bg-success',
      'CANCELLED': 'bg-danger',
      'REFUNDED': 'bg-danger',
      'OUT_FOR_DELIVERY': 'bg-warning text-dark',
      'PENDING': 'bg-info text-white'
    };
    return themes[status] || 'bg-primary';
  }
}