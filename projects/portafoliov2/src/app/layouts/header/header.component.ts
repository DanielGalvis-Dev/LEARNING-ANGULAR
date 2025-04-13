import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SocialLinkButtonComponent } from '../social-link-button/social-link-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSlideToggleModule, SocialLinkButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  checked = true;

  toggleDarkMode() {
    this.checked = !this.checked;
    console.log('Dark mode: ', this.checked ? 'enabled' : 'disabled');
  }
}
