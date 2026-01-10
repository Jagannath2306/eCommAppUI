import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../../core/services/menu/menu.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgbCollapseModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private menuService = inject(MenuService);
  private alert = inject(AlertService);
  private cdr = inject(ChangeDetectorRef); // Added for manual refresh

  menus: any[] | null = null; // Changed to null initially
  openModuleId: string | null = null;

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    const email = localStorage.getItem('email');
    if (!email) {
      this.menus = []; // Stop loading state
      return;
    }

    this.menuService.loadMenu(email).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Process data
          const builtMenu = this.menuService.buildMenu(res.data);
          
          // CRITICAL: Ensure we are assigning an array
          this.menus = Array.isArray(builtMenu) ? builtMenu : [];

          if (this.menus.length > 0 && !this.openModuleId) {
            this.openModuleId = (this.menus[0]._id || '0').toString();
          }
          
          // Force UI Update
          this.cdr.detectChanges(); 
        } else {
          this.menus = [];
          this.alert.error(res.message || 'Failed to build menu');
        }
      },
      error: (err) => {
        this.menus = [];
        this.alert.error(err.error?.message || 'Menu load failed');
        this.cdr.detectChanges();
      }
    });
  }

  toggleModule(id: string) {
    this.openModuleId = this.openModuleId === id ? null : id;
  }
}