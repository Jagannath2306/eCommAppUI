import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
