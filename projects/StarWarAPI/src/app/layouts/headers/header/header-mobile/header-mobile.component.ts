import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { buttons } from '../header.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css',
})
export class HeaderMobileComponent {
  @Input() actions!: buttons[];
}
