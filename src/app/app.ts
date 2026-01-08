import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Login } from './features/auth/login/login';
import { CommonModule } from '@angular/common';
import { Register } from './features/auth/register/register';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Loader } from './shared/components/loader/loader';
import { LoaderService } from './core/services/loader/loader';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    Sidebar,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    NgxSpinnerModule,
    Loader
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private loader: LoaderService) {}
  protected readonly title = signal('eCommAppUI');
  isLoggedIn = signal(false);

  toggleLogin() {
    this.isLoggedIn.set(!this.isLoggedIn());
  }

  ngOnInit() {
  }
}
