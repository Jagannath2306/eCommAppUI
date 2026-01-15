import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from './core/services/loader/loader';
import { Loader } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Loader
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eCommAppUI');
  private loader = inject(LoaderService);


  ngOnInit() {
  }
}
