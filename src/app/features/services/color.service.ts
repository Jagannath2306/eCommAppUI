import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { ColorResponse } from '../models/color.model';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getColors() {
    return this.http.get<ColorResponse>(`${this.baseUrl}/Color/GetColorList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteColor(id: string) {
    return this.http
      .put<ColorResponse>(`${this.baseUrl}/Color/Delete`, {
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
  saveColor(color: any) {
    return this.http
      .post<ColorResponse>(`${this.baseUrl}/Color/Save`, { name: color.name, code: color.code })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
  }
  updateColor(color: any) {
    return this.http.post<ColorResponse>(`${this.baseUrl}/Color/Update`, color).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  getColorById(colorId: any) {
    return this.http.post<ColorResponse>(`${this.baseUrl}/Color/GetById`, { id: colorId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
