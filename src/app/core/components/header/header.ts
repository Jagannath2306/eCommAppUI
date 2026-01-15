import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ConfirmService } from '../../../shared/services/confirm.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
   private confirmService = inject(ConfirmService);

   async logOut() {
   const confirmed = await this.confirmService.confirm({
      title: 'Are you logging out?',
      message: '',
      confirmText: 'Log Out',
      confirmColor: '#f36716',
    });
     if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/login'])
     }
  }

}
