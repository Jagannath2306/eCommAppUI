import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../shared/services/alert.service';
import { PaymentService } from '../../../services/payment.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentInfo } from '../../../models/payment.model';

@Component({
  selector: 'app-view-payment',
  imports: [AppModal, CommonModule],
  templateUrl: './view-payment.html',
  styleUrl: './view-payment.css',
})
export class ViewPayment {
private alert = inject(AlertService);
  private paymentService = inject(PaymentService);
  public activeModal = inject(NgbActiveModal);
  payment = signal<PaymentInfo | any>(null);
  selectedImage = signal<string | null>(null);
  baseURL = 'http://localhost:5000/'; // Match your backend port

  @Input() paymentId!: string;

  ngOnInit() {
    console.log(this.paymentId);
    
      this.getPayment();
  }

  getPayment() {
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: any = res.data;

        console.log(data);
          this.payment.set(data);
        } else {
          this.payment.set(null);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.payment.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
  getStatusColor(status: string): string {
    switch (status?.toUpperCase()) {
      case 'SUCCESS': return 'text-success border-success';
      case 'FAILED': return 'text-danger border-danger';
      case 'PENDING': return 'text-warning border-warning';
      default: return 'text-primary border-primary';
    }
  }
}
