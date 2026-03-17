import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { PaymentResponse } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getPayments() {
    return this.http.get<PaymentResponse>(`${this.baseUrl}/Payment/GetPaymentList`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }


 

  getPaymentById(paymentId: any) {
    return this.http.post<PaymentResponse>(`${this.baseUrl}/payment/getPaymentById`, { id: paymentId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
 
}
