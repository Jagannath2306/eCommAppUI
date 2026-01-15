import { Component, inject, Input, signal } from '@angular/core';
import { AppModal } from '../../../../shared/components/app-modal/app-modal/app-modal';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInfo } from '../../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-user',
  imports: [AppModal, CommonModule],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {
  private authService = inject(AuthService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private userService = inject(UserService);
  private activeModal = inject(NgbActiveModal);

  @Input() userId!: string;

  user = signal<UserInfo | null>(null);
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Create a temporary object to format dates
          const data = res.data;

          const formattedData = {
            ...data,
            createdOn: this.formatDateTime(data.createdOn),
            updatedOn: this.formatDateTime(data.updatedOn),
          };

          this.user.set(formattedData);
        } else {
          this.user.set(null); // Clear data if success is false
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.user.set(null);
        this.alert.error(err.error?.message || 'Server Error');
      },
    });
  }
formatDateTime = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        
        // Date part: 15 Jan 2026
        const datePart = d.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });

        // Time part: 02:30 pm
        const timePart = d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).toLowerCase();

        return `CreatedOn : ${datePart} , At : ${timePart}`;
      };
}
