import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/services/loader/loader';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  loader = inject(LoaderService);

  ngOnInit() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide(); // simulate HTTP call
    }, 2000);
  }
}
