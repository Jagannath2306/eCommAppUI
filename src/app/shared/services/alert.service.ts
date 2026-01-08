import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  show(title: string, message: string, icon: SweetAlertIcon = 'error') {
    return Swal.fire({
      title,
      html: `
  <div class="swal-message ${this.getMessageClass(icon)}">
    ${message}
  </div>
`,
      //   icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#08cdbd',
    });
  }

  error(message: string, title = 'Error') {
    return this.show(title, message, 'error');
  }

  success(message: string, title = 'Success') {
    return this.show(title, message, 'success');
  }

  warning(message: string, title = 'Warning') {
    return this.show(title, message, 'warning');
  }

  info(message: string, title = 'Info') {
    return this.show(title, message, 'info');
  }
  getMessageClass(icon: SweetAlertIcon) {
    return `${icon}-message`;
  }
}
