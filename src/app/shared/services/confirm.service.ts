import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ConfirmService {

  confirm(options?: {
    title?: string;
    message?: string;
    icon?: SweetAlertIcon;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
  }): Promise<boolean> {

    return Swal.fire({
      title: options?.title ?? 'Are you sure?',
      text: options?.message ?? 'This action cannot be undone',
      icon: options?.icon ?? 'warning',
      showCancelButton: true,
      confirmButtonText: options?.confirmText ?? 'Yes',
      cancelButtonText: options?.cancelText ?? 'Cancel',
      confirmButtonColor: options?.confirmColor ?? '#d33',
      reverseButtons: true,
      focusCancel: true
    }).then(result => result.isConfirmed);
  }
}
