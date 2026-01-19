import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { CategoryResponse, Product, ProductDeleteResponse, ProductResponse, TagsResponse } from '../models/product.modal';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getProducts() {
    return this.http.get<ProductResponse>(`${this.baseUrl}/Product/GetProducts`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getCategories() {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/Category/GetCategories`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/Tag/GetTags`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteProduct(id: string) {
    return this.http
      .put<ProductDeleteResponse>(`${this.baseUrl}/Product/Delete`, {
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
    saveProduct(product: any) {
    return this.http.post<ProductResponse>(`${this.baseUrl}/Product/Save`, product).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
    updateProduct(product: any) {
    return this.http.post<ProductResponse>(`${this.baseUrl}/Product/Update`, product).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

    getProductById(productId: any) {
    return this.http.post<ProductResponse>(`${this.baseUrl}/Product/GetById`, { id: productId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
