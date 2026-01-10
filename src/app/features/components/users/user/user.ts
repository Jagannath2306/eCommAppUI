import { Component, inject, signal } from '@angular/core';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { DataTable } from '../../../../shared/components/data-table/data-table';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { UserList } from '../../../models/user.model';

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

  onEdit(user: any) {
    console.log('Edit', user);
  }

  onDelete(user: any) {
    console.log('Delete', user);
  }
}
