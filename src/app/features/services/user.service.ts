import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { UsersResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getUsers(pageSize?: number, page?: number, sortCol?: string, sort?: string) {
    return this.http
      .get<UsersResponse>(`${this.baseUrl}/User/GetAllUsersUnlimited`, {
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        })
      );
  }
}
