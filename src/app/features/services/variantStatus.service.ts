import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { VariantResponse } from '../models/variantStatus.model';

@Injectable({ providedIn: 'root' })
export class VariantStatusService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getVariantStatus() {
    return this.http.get<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/GetVariantStatusList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteVariantStatus(id: string) {
    return this.http
      .put<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/Delete`, {
        id,
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
  saveVariantStatus(variant: any) {
    return this.http
      .post<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/Save`, variant)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
  }
  updateVariantStatus(variant: any) {
    return this.http.post<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/Update`, variant).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  getVariantStatusById(variantId: any) {
    return this.http.post<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/GetById`, { id: variantId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
