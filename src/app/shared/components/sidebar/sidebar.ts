import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,NgbCollapseModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public isDashboardCollapsed = false;
  public isOrdersCollapsed = true;
}
