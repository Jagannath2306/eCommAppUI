import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../core/services/menu/menu.service';
import { take } from 'rxjs/operators';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink,NgbCollapseModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menu$ = inject(MenuService).menu$;


openModuleId: string | null = null;


ngOnInit() {
  this.menu$.subscribe(data => {
    // 1. Check if we have data and if nothing is already open
    if (data && data.length > 0 && !this.openModuleId) {
      
      // 2. Set the default open ID to the first item
      // We use the same fallback logic as the template (id or "0")
      this.openModuleId = data[0]._id || '0';
    }
  });
}
  toggleModule(id: string) {
    // 3. Strict accordion logic
    this.openModuleId = this.openModuleId === id ? null : id;
  }
}
