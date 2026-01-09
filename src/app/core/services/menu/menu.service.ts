import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ModuleMenu, SubModuleMenu, MenuList } from '../../models/menu.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuSubject = new BehaviorSubject<any[]>([]);
  menu$ = this.menuSubject.asObservable();
   private baseUrl = environment.apiBaseUrl;

  private loaded = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** Call once after login */
loadMenu(payload:{}) {
    if (this.loaded) return;

    this.http.post<MenuList>(`${this.baseUrl}/UserPageRights/GetByUserId`, payload).subscribe({
      next: (res) => {
        this.menuSubject.next(this.buildMenu(res.data));
        this.loaded = true;
      },
      error: () => {
        this.menuSubject.next([]);
        this.loaded = false;
      }
    });
  }

  clearMenu() {
    this.menuSubject.next([]);
    this.loaded = false;
  }

  /** Flat → Hierarchy */

  private buildMenu(response: any[]): ModuleMenu[] {
    const modulesMap = new Map<
      string,
      {
        id: string;
        name: string;
        icon: string;
        menuRank: number;
        subModules: Map<string, SubModuleMenu>;
      }
    >();

    response
      .filter((r) => r.isActive)
      .forEach((item) => {
        const m = item.moduleId;
        const sm = item.subModuleId;
        const p = item.pageIds;

        if (!modulesMap.has(m._id)) {
          modulesMap.set(m._id, {
            id: m._id,
            name: m.name,
            icon: m.icon,
            menuRank: m.menuRank,
            subModules: new Map<string, SubModuleMenu>(),
          });
        }

        const moduleObj = modulesMap.get(m._id)!;

        if (!moduleObj.subModules.has(sm._id)) {
          moduleObj.subModules.set(sm._id, {
            id: sm._id,
            name: sm.name,
            icon: sm.icon,
            menuRank: sm.menuRank,
            pages: [],
          });
        }

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
        subModules: Array.from(module.subModules.values()).map((submodule) => ({
          ...submodule,
          pages: [...submodule.pages].sort((a, b) => a.menuRank - b.menuRank),
        })),
      }))
      .sort((a, b) => a.menuRank - b.menuRank);
  }
}
