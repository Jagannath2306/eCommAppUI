import { Component, input, output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export type ModalMode = 'view' | 'create' | 'edit';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './app-modal.html',
})
export class AppModal {
  mode = input<ModalMode>('view');
  // Signal-based Inputs
  title = input<string>('');
  confirmText = input<string>('Save');
  cancelText = input<string>('Cancel');
  disableConfirm = input<boolean>(false);

  // Signal-based Output
  confirm = output<void>();

  // Use inject() instead of constructor injection (Modern Pattern)
  public activeModal = inject(NgbActiveModal);

  onConfirm() {
    this.confirm.emit();
  }
}
