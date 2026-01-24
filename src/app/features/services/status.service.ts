import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { StatusResponse } from '../models/status.model';

@Injectable({ providedIn: 'root' })
export class StatusService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getStatus() {
    return this.http.get<StatusResponse>(`${this.baseUrl}/ProductStatusMaster/GetStatusList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteStatus(id: string) {
    return this.http
      .put<StatusResponse>(`${this.baseUrl}/ProductStatusMaster/Delete`, {
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
  saveStatus(status: any) {
    return this.http
      .post<StatusResponse>(`${this.baseUrl}/ProductStatusMaster/Save`, status)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
  }
  updateStatus(status: any) {
    return this.http.post<StatusResponse>(`${this.baseUrl}/ProductStatusMaster/Update`, status).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  getStatusById(colorId: any) {
    return this.http.post<StatusResponse>(`${this.baseUrl}/ProductStatusMaster/GetById`, { id: colorId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
