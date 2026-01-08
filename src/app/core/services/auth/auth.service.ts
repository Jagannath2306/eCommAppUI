import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  public isLoggedIn = signal(false);
  private baseUrl = environment.apiBaseUrl;

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/User/Login`, { email, password }).pipe(
      tap((response) => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data);
          this.isLoggedIn.set(true);
        } else {
          // handle error message
          console.error(response.message || 'Login failed');
          this.isLoggedIn.set(false);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}
