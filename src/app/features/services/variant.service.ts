import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { VariantResponse } from '../models/variant.model';
import { ProductResponse } from '../models/product.modal';
import { ColorResponse } from '../models/color.model';
import { SizeResponse } from '../models/size.model';

@Injectable({ providedIn: 'root' })
export class VariantService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getVariants() {
    return this.http.get<VariantResponse>(`${this.baseUrl}/ProductVariant/GetVariantList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getProductList() {
    return this.http.get<ProductResponse>(`${this.baseUrl}/Product/GetProducts`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getColorList() {
    return this.http.get<ColorResponse>(`${this.baseUrl}/Color/GetColorList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getSizeList() {
    return this.http.get<SizeResponse>(`${this.baseUrl}/Size/GetSizeList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getStatusList() {
    return this.http.get<VariantResponse>(`${this.baseUrl}/VariantStatusMaster/GetVariantStatusList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteVariant(id: string) {
    return this.http
      .put<VariantResponse>(`${this.baseUrl}/ProductVariant/Delete`, {
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
  saveVariant(variant: any) {
    return this.http
      .post<VariantResponse>(`${this.baseUrl}/ProductVariant/Save`, {
        productId: variant.productId,
        colorId: variant.colorId,
        sizeId: variant.sizeId,
        price: variant.price,
        stock: variant.stock,
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
  updateVariant(variant: any) {
    return this.http.post<VariantResponse>(`${this.baseUrl}/ProductVariant/Update`, variant).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  getVariantById(variantId: any) {
    return this.http
      .post<VariantResponse>(`${this.baseUrl}/ProductVariant/GetById`, { id: variantId })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        }),
      );
  }
}
