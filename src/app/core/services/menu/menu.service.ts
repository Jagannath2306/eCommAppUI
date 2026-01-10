import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ModuleMenu, SubModuleMenu, MenuList } from '../../models/menu.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = environment.apiBaseUrl;

  private http = inject(HttpClient);

  loadMenu(email: string) {
    return this.http
      .post<MenuList>(`${this.baseUrl}/UserPageRights/GetMenusByUser`, { email })
      .pipe(
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
    const modulesMap = new Map<
      string,
      {
        id: string;
        name: string;
        icon: string;
        url: string;
        menuRank: number;
        subModules: Map<string, SubModuleMenu>;
      }
    >();

    response
      .filter((r) => r?.isActive === true)
      .forEach((item) => {
        const m = item.moduleId;
        const sm = item.subModuleId;
        const p = item.pageIds; // ✅ FIXED

        if (!m || !sm || !p) return;

        // MODULE
        if (!modulesMap.has(m._id)) {
          modulesMap.set(m._id, {
            id: m._id,
            name: m.name,
            icon: m.icon,
            url: m.url,
            menuRank: m.menuRank,
            subModules: new Map<string, SubModuleMenu>(),
          });
        }

        const moduleObj = modulesMap.get(m._id)!;

        // SUBMODULE
        if (!moduleObj.subModules.has(sm._id)) {
          moduleObj.subModules.set(sm._id, {
            id: sm._id,
            name: sm.name,
            url: sm.url,
            icon: sm.icon,
            menuRank: sm.menuRank,
            pages: [],
          });
        }

        // PAGE
        moduleObj.subModules.get(sm._id)!.pages.push({
          id: p._id,
          name: p.name,
          url: p.url,
          icon: p.icon,
          menuRank: p.menuRank,
        });
      });

    return Array.from(modulesMap.values())
      .map((module) => ({
        ...module,
        subModules: Array.from(module.subModules.values())
          .map((sub) => ({
            ...sub,
            pages: sub.pages.sort((a, b) => a.menuRank - b.menuRank),
          }))
          .sort((a, b) => a.menuRank - b.menuRank),
      }))
      .sort((a, b) => a.menuRank - b.menuRank);
  }
}
