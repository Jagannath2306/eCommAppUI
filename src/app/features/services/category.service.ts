import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { CategoryResponse } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;


  getCategories() {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/Category/GetCategoriesList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteCategory(id: string) {
    return this.http
      .put<CategoryResponse>(`${this.baseUrl}/Category/Delete`, {
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
    saveCategory(category: any) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}/Category/Save`, category).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
    updateCategory(category: any) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}/Category/Update`, category).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

    getCategoryById(categoryId: any) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}/Category/GetById`, { id: categoryId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
