import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ModuleMenu, SubModuleMenu, MenuList } from '../../models/menu.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = environment.apiBaseUrl;

  private http = inject(HttpClient);

  loadMenu() {
    return this.http.get<MenuList>(`${this.baseUrl}/UserPageRights/GetMenus`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      })
    );
  }
  getPermissions() {
    return this.http.get<MenuList>(`${this.baseUrl}/RolePermission/GetPermissions`).pipe(
      tap((response) => {
        if (response.success && response.data) {
        } else {
          console.error(response.message);
        }
      })
    );
  }

  /** Flat → Hierarchy */

  buildMenu(response: any[]): ModuleMenu[] {
    return (response || [])
      .filter((module) => module?.isActive !== false)
      .map((module) => ({
        id: module._id,
        name: module.name,
        icon: module.icon ?? '',
        url: module.url ?? null,
        menuRank: module.menuRank ?? 0,

        subModules: (module.subModules || [])
          .map((sub: any) => ({
            id: sub._id,
            name: sub.name,
            icon: sub.icon ?? '',
            url: sub.url ?? null,
            menuRank: sub.menuRank ?? 0,

            pages: (sub.pages || [])
              .map((p: any) => ({
                id: p._id,
                name: p.name,
                icon: p.icon ?? '',
                url: p.url ?? null,
                menuRank: p.menuRank ?? 0,
              }))
              .sort((a: any, b: any) => a.menuRank - b.menuRank),
          }))
          .sort((a: any, b: any) => a.menuRank - b.menuRank),
      }))
      .sort((a, b) => a.menuRank - b.menuRank);
  }
}
