import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { HeaderDesktopComponent } from './header-desktop/header-desktop.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';

export interface buttons {
  name: string;
  icon: string;
  page: () => void;
  disabled: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    HeaderDesktopComponent,
    HeaderMobileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Constructor que inyecta el servicio Router para la navegación
  constructor(private router: Router) {}

  // Objeto que contiene métodos para navegar a diferentes páginas
  pages = {
    peoples: () => this.router.navigate(['peoples']), // Método para navegar a la página 'peoples'
    planets: () => this.router.navigate(['planets']), // Método para navegar a la página 'planets'
    films: () => this.router.navigate(['films']), // Método para navegar a la página 'films'
    species: () => this.router.navigate(['species']), // Método para navegar a la página 'species'
    vehicles: () => this.router.navigate(['vehicles']), // Método para navegar a la página 'vehicles'
    starships: () => this.router.navigate(['starships']), // Método para navegar a la página 'starships'
  };

  // Array de configuraciones de botones para navegar entre páginas
  // name: Nombre del botón
  // icon: Icono asociado con el botón
  // page: Manejador de eventos para la navegación entre paginas
  // disabled: Indica si el botón está deshabilitado

  actions: buttons[] = [
    {
      name: 'peoples',
      icon: 'person',
      page: this.pages.peoples.bind(this),
      disabled: false,
    },
    {
      name: 'planets',
      icon: 'public',
      page: this.pages.planets.bind(this),
      disabled: false,
    },
    {
      name: 'films',
      icon: 'movie',
      page: this.pages.films.bind(this),
      disabled: false,
    },
    {
      name: 'species',
      icon: 'groups',
      page: this.pages.species.bind(this),
      disabled: false,
    },
    {
      name: 'vehicles',
      icon: 'directions_car',
      page: this.pages.vehicles.bind(this),
      disabled: false,
    },
    {
      name: 'starships',
      icon: 'rocket_launch',
      page: this.pages.starships.bind(this),
      disabled: false,
    },
  ];

  // Método para navegar a la página 'inicio'
  inicio() {
    this.router.navigate(['inicio']); // Navegar a la página 'inicio'
  }
}
