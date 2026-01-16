import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserTypeList } from '../../../models/user.model';
import { PermissionService } from '../../../services/permission.service';
import { Modules, Pages, SubModules } from '../../../models/permission.model';

@Component({
  selector: 'app-user-permission',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-permission.html',
  styleUrl: './user-permission.css',
})
export class UserPermission {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private userService = inject(UserService);
  private permissionService = inject(PermissionService);
  private cdr = inject(ChangeDetectorRef);
  // private activeModal = inject(NgbActiveModal);
  submitted = false;

  userTypes = signal<UserTypeList[]>([]);
  modules = signal<Modules[]>([]);
  subModules = signal<SubModules[]>([]);
  pages = signal<Pages[]>([]);
  filterForm = this.fb.group({
    userTypeId: ['', Validators.required],
    moduleId: ['', Validators.required],
    subModuleId: ['', Validators.required],
  });

  permissionForm = this.fb.group({
    pages: this.fb.array([]),
  });

  get f() {
    return this.filterForm.controls;
  }
  get pagesFormArray() {
    return this.permissionForm.get('pages') as FormArray;
  }
  ngOnInit() {
    this.getUserTypes();
    this.getModules();

    this.filterForm.get('moduleId')?.valueChanges.subscribe((moduleId: any) => {
      if (!moduleId) {
        return;
      }
      this.getSubModules(moduleId);
    });
  }
  getUserTypes() {
    this.userService.getUserTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.userTypes.set(res.data || []);
        } else {
          this.userTypes.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  getModules() {
    this.permissionService.getModules().subscribe({
      next: (res) => {
        if (res.success) {
          this.modules.set(res.data || []);
        } else {
          this.modules.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  getSubModules(moduleId: string) {
    this.permissionService.getSubModules(moduleId).subscribe({
      next: (res) => {
        if (res.success) {
          this.subModules.set(res.data || []);
        } else {
          this.subModules.set([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  onSearch() {
    this.submitted = true;
    if (this.filterForm.invalid) return;

    const { moduleId, subModuleId, userTypeId } = this.filterForm.value;
    this.permissionService.getPages(moduleId!, subModuleId!, userTypeId!).subscribe({
      next: (res) => {
        if (res.success) {
          this.setPaginationData(res.data);
        } else {
          this.setPaginationData([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
  setPaginationData(data: any[]) {
    const pageFGs = data.map((page) =>
      this.fb.group({
        pageId: [page._id],
        name: [page.name],
        pageCode: [page.pageCode],
        actions: this.fb.group({
          view: [!!page.actions?.view],
          create: [!!page.actions?.create],
          edit: [!!page.actions?.edit],
          delete: [!!page.actions?.delete],
          approve: [!!page.actions?.approve],
          reject: [!!page.actions?.reject],
          block: [!!page.actions?.block],
          unblock: [!!page.actions?.unblock],
        }),
      })
    );
    const pageFormArray = this.fb.array(pageFGs);
    this.permissionForm.setControl('pages', pageFormArray as any);
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  onSave() {
    // Use getRawValue() to get the full object
    const formValue = this.permissionForm.getRawValue();

    // Check if pages exists (to satisfy strict null checks)
    if (!formValue.pages) return;

    const payload = {
      userTypeId: this.filterForm.value.userTypeId, // ensure you get this from your first form
      permissions: formValue.pages.map((p: any) => ({
        pageId: p.pageId,
        actions: p.actions,
      })),
    };

    const {userTypeId , permissions} = payload;

    console.log('Payload for API:', payload);
    this.permissionService.saveAndUpdatePermissions(userTypeId,permissions).subscribe({
      next: (res) => {
        if (res.success) {
          this.pages.set(res.data || []);
          // this.setPaginationData(res.data);
          this.toast.success(res.message);
        } else {
          // this.setPaginationData([]);
          this.alert.error(res.message);
        }
      },
      error: (err) => {
        this.alert.error(err.error.message);
      },
    });
  }
}
