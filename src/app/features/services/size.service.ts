import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { CategoryResponse } from '../models/category.model';
import { SizeResponse } from '../models/size.model';

@Injectable({ providedIn: 'root' })
export class SizeService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;


  getSizes() {
    return this.http.get<SizeResponse>(`${this.baseUrl}/Size/GetSizeList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteSize(id: string) {
    return this.http
      .put<SizeResponse>(`${this.baseUrl}/Size/Delete`, {
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
    saveSize(size: any) {
    return this.http.post<SizeResponse>(`${this.baseUrl}/Size/Save`, {name: size.name}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
    updateSize(size: any) {
    return this.http.post<SizeResponse>(`${this.baseUrl}/Size/Update`, size).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

    getSizeById(sizeId: any) {
    return this.http.post<SizeResponse>(`${this.baseUrl}/Size/GetById`, { id: sizeId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
