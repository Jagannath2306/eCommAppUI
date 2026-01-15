import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import {
  UserDeleteResponse,
  UserInfo,
  UserInfoResponse,
  UsersResponse,
  UserTypesResponse,
} from '../models/user.model';
import { RegisterResponse } from '../../core/models/auth.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getUsers(pageSize?: number, page?: number, sortCol?: string, sort?: string) {
    return this.http.get<UsersResponse>(`${this.baseUrl}/User/GetUsers`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      })
    );
  }
  getUserTypes() {
    return this.http.get<UserTypesResponse>(`${this.baseUrl}/UserType/GetUserTypes`, {}).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      })
    );
  }

  getUser(id: string) {
    return this.http
      .post<UserInfoResponse<UserInfo>>(`${this.baseUrl}/User/GetUserById`, { id }, {})
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        })
      );
  }

  updateUser(id: string, firstName: string, lastName: string, userTypeId: string) {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/User/UpdateProfile`, {
        id,
        firstName,
        lastName,
        userTypeId,
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
  deleteUser(id: string) {
    return this.http
      .put<UserDeleteResponse>(`${this.baseUrl}/User/DeteteUserById`, {
        id,
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
