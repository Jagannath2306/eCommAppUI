import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { TagResponse } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;


  getTags() {
    return this.http.get<TagResponse>(`${this.baseUrl}/Tag/GetTagList`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

  deleteTag(id: string) {
    return this.http
      .put<TagResponse>(`${this.baseUrl}/Tag/Delete`, {
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
    saveTag(tag: any) {
    return this.http.post<TagResponse>(`${this.baseUrl}/Tag/Save`, {name: tag.name}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
    updateTag(tag: any) {
    return this.http.post<TagResponse>(`${this.baseUrl}/Tag/Update`, tag).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }

    getTagById(tagId: any) {
    return this.http.post<TagResponse>(`${this.baseUrl}/Tag/GetById`, { id: tagId }).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      }),
    );
  }
}
