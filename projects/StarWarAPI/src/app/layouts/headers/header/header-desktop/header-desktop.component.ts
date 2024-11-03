import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { buttons } from '../header.component';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [NgClass, MatButtonModule],
  templateUrl: './header-desktop.component.html',
  styleUrl: './header-desktop.component.css',
})
export class HeaderDesktopComponent {
  @Input() actions!: buttons[];
}
