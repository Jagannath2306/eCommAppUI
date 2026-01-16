import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ActionMap = {
  view?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  approve?: boolean;
  reject?: boolean;
  block?: boolean;
  unblock?: boolean;
};

@Injectable({ providedIn: 'root' })
export class PermissionService {

  // pageCode -> actions object
  private permissionMap = new Map<string, ActionMap>();
  private permissionsLoaded$ = new BehaviorSubject<boolean>(false);

  setPermissions(permissions: any[]) {
    this.permissionMap.clear();

    permissions.forEach(p => {
      this.permissionMap.set(p.pageCode, p.actions);
    });

    this.permissionsLoaded$.next(true);
  }

  hasPermission(pageCode: string, action: keyof ActionMap): boolean {
    return this.permissionMap.get(pageCode)?.[action] === true;
  }

  permissionsReady$() {
    return this.permissionsLoaded$.asObservable();
  }
}
