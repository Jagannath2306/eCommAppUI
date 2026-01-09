import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  LoginResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  OtpResponse,
  RegisterResponse,
} from '../../models/auth.model';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  public isLoggedIn = signal(false);
  private baseUrl = environment.apiBaseUrl;

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/User/Register`, {firstName,lastName, email, password,confirmPassword }).pipe(
      tap((response) => {
        if (response.success && response.data) {

        } else {
          console.error(response.message);

        }
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/User/Login`, { email, password }).pipe(
      tap((response) => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data);
          this.isLoggedIn.set(true);
        } else {
          // handle error message
          console.error(response.message);
          this.isLoggedIn.set(false);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  forgotPassword(email: string) {
    return this.http
      .post<ForgotPasswordResponse>(`${this.baseUrl}/User/forgotUserPassword`, { email })
      .pipe(
        tap((response) => {
          if (response.success && response.resetToken) {
            sessionStorage.setItem('resetToken', response.resetToken);
          } else {
            console.error(response.message);
          }
        })
      );
  }

  resetOtp() {
    const resetToken = sessionStorage.getItem('resetToken');
    console.log(resetToken);
    return this.http.post<OtpResponse>(`${this.baseUrl}/User/resendUserOtp`, { resetToken }).pipe(
      tap((response) => {
        if (response.success) {
        } else {
          console.error(response.message);
        }
      })
    );
  }
  resetPassword(otp: string, newPassword: string, confirmPassword: string) {
    const resetToken = sessionStorage.getItem('resetToken');
    return this.http
      .post<ResetPasswordResponse>(`${this.baseUrl}/User/resetUserPassword`, {
        otp,
        newPassword,
        confirmPassword,
        resetToken,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
          } else {
            console.error(response.message);
          }
        })
      );
  }
}
