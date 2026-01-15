import { Component, inject, signal } from '@angular/core';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { DataTable } from '../../../../shared/components/data-table/data-table';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { UserList } from '../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUser } from '../create-user/create-user';
import { ViewUser } from '../view-user/view-user';
import { EditUser } from '../edit-user/edit-user';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-user',
  imports: [DataTable],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private router = inject(Router);
  private userService = inject(UserService);
  private alert = inject(AlertService);
  private modalService = inject(NgbModal);
  private confirmService = inject(ConfirmService);
  private toast = inject(ToastService);
  users = signal<UserList[]>([]);

  // Header config
  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'isActive', label: 'Active', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'createdOn', label: 'Created On', sortable: true },
    { key: 'updatedBy', label: 'Created By', sortable: true },
  ];

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        if (res.success) {
          this.users.set(res.data || []);
        } else {
          this.users.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  openCreateUser() {
    const modalRef = this.modalService.open(CreateUser, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
  onEdit(user: any) {
    const modalRef = this.modalService.open(EditUser, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.userId = user._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  async onDelete(user: any) {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete User',
      message: 'Are you sure?',
      confirmText: 'Delete',
      confirmColor: '#f36716',
    });

    if (confirmed) {
      this.userService.deleteUser(user._id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(res.message);
            this.getUsers();
          } else {
            this.users.set([]);
            this.alert.error(res.message);
          }
        },
        error: (err) => {
          this.alert.error(err.error.message);
        },
      });
    }
  }
  onView(user: any) {
    const modalRef = this.modalService.open(ViewUser, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.userId = user._id;
    modalRef.result.then((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
