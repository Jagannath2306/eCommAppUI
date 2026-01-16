import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { ModuleList, PageList, PermissionList, SubModuleList } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private baseUrl = environment.apiBaseUrl;

  getModules() {
    return this.http.get<ModuleList>(`${this.baseUrl}/ModuleMaster/GetModules`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      })
    );
  }
  getSubModules(id: string) {
    return this.http
      .post<SubModuleList>(`${this.baseUrl}/SubModuleMaster/GetSubModuleByModuleId`, { id })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        })
      );
  }
  getPages(moduleId: string, subModuleId: string, userTypeId: string) {
    return this.http
      .post<PageList>(`${this.baseUrl}/PageMaster/GetPageByModuleIdBySubModuleIdByUserTypeId`, {
        moduleId,
        subModuleId,
        userTypeId,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        })
      );
  }
  saveAndUpdatePermissions(userTypeId: any, permissions:any) {
    console.log(userTypeId, permissions)
    return this.http
      .post<PermissionList>(`${this.baseUrl}/RolePermission/SaveAndUpdatePermissions`, {
        userTypeId,
        permissions,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
          } else {
            console.error(response.message);
          }
        })
      );
  }
}
