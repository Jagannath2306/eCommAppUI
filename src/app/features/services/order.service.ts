import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { OrderResponse } from '../models/orders.modal';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getOrders() {
    return this.http.get<OrderResponse>(`${this.baseUrl}/Order/GetOrdersList`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  createOrder(order: any) {
    return this.http
      .post<OrderResponse>(`${this.baseUrl}/Order/CreateOrder`, {
        ...order,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
  }
 

  getOrderById(orderId: any) {
    return this.http.post<OrderResponse>(`${this.baseUrl}/Order/getOrderById`, { id: orderId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getStatusList() {
    return this.http.get<OrderResponse>(`${this.baseUrl}/Order/getStatusList`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
   updateOrderStatus(order: any) {
      return this.http.post<OrderResponse>(`${this.baseUrl}/Order/UpdateOrderStatus`, order).pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
    }
  cancelOrder(orderId: any) {
    return this.http.post<OrderResponse>(`${this.baseUrl}/Order/cancelOrder`, { id: orderId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

    getOrderStatusHistoryById(orderId: any) {
    return this.http.post<OrderResponse>(`${this.baseUrl}/OrderStatusHistory/getOrderStatusHistoryById`, { id: orderId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
