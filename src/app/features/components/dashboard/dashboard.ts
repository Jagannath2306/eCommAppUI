import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../core/components/header/header';
import { Footer } from '../../../core/components/footer/footer';
import { Sidebar } from '../../../core/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    Sidebar,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
