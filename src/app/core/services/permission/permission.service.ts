import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissionMap = new Map<string, Set<string>>();
  private permissionsLoaded$ = new BehaviorSubject<boolean>(false);

  setPermissions(permissions: any[]) {
    this.permissionMap.clear();

    permissions.forEach(p => {
      this.permissionMap.set(p.pageCode, new Set(p.actions));
    });

    this.permissionsLoaded$.next(true); // 🔥 notify listeners
  }

  hasPermission(pageCode: string, action: string): boolean {
    return this.permissionMap.get(pageCode)?.has(action) ?? false;
  }

  permissionsReady$() {
    return this.permissionsLoaded$.asObservable();
  }
}