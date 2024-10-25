import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { HeaderDesktopComponent } from './header-desktop/header-desktop.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';

export interface buttons {
  name: string;
  icon: string;
  event: (button: buttons) => void;
  disabled: boolean;
  active: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    HeaderDesktopComponent,
    HeaderMobileComponent,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Constructor
  constructor(private router: Router) {}

  // Botones para navegar entre paginas
  actions: buttons[] = [
    {
      name: 'characters',
      icon: 'person',
      event: this.characters.bind(this),
      disabled: false,
      active: false,
    },
    {
      name: 'planets',
      icon: 'public',
      event: this.planets.bind(this),
      disabled: false,
      active: false,
    },
    {
      name: 'films',
      icon: 'movie',
      event: this.films.bind(this),
      disabled: false,
      active: false,
    },
    {
      name: 'species',
      icon: 'groups',
      event: this.species.bind(this),
      disabled: true,
      active: false,
    },
    {
      name: 'vehicles',
      icon: 'directions_car',
      event: this.vehicles.bind(this),
      disabled: true,
      active: false,
    },
    {
      name: 'starships',
      icon: 'rocket_launch',
      event: this.starships.bind(this),
      disabled: true,
      active: false,
    },
  ];

  inicio() {
    this.router.navigate(['inicio']);
    this.actions.forEach((btn) => (btn.active = false));
  }

  //  Pagina de personajes
  characters(button: buttons) {
    this.router.navigate(['characters']);
    this.isActive(button);
  }

  // Pagina de planetas
  planets(button: buttons) {
    this.router.navigate(['planets']);
    this.isActive(button);
  }

  // Pagina de peliculas
  films(button: buttons) {
    this.router.navigate(['films']);
    this.isActive(button);
  }

  // Pagina de especies
  species(button: buttons) {
    this.router.navigate(['species']);
    this.isActive(button);
  }

  // Pagina de vehiculos
  vehicles(button: buttons) {
    this.router.navigate(['vehicles']);
    this.isActive(button);
  }

  // Pagina de naves espaciales
  starships(button: buttons) {
    this.router.navigate(['starships']);
    this.isActive(button);
  }

  isActive(button: buttons) {
    this.actions.forEach((btn) => (btn.active = false));
    button.active = true;
  }
}
