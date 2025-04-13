import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-social-link-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,],
  templateUrl: './social-link-button.component.html',
  styleUrl: './social-link-button.component.scss',
})
export class SocialLinkButtonComponent {
  Socials = [
    {
      name: 'fab fa-linkedin-in',
      link: 'https://linkedin.com/in/danielgalvis-dev',
    },
    {
      name: 'fab fa-github',
      link: 'http://github.com/DanielGalvis-Dev',
    },
    {
      name: 'fab fa-whatsapp',
      link: 'https://wa.me/573006188395',
    },
    {
      name: 'fa fa-envelope',
      link: 'mailto:djgz2004@gmail.com',
    },
  ];
}
