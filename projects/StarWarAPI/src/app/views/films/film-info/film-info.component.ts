import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { filmsRes } from '../../../models/films.model';
import { FilmsService } from '../../../services/films.service';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { FilmBasicInfoComponent } from './film-basic-info/film-basic-info.component';
import { PeoplesSectionComponent } from '../../../layouts/sections/peoples-section/peoples-section.component';
import { PlanetsSectionComponent } from '../../../layouts/sections/planets-section/planets-section.component';
import { StarshipsSectionComponent } from '../../../layouts/sections/starships-section/starships-section.component';
import { VehiclesSectionComponent } from '../../../layouts/sections/vehicles-section/vehicles-section.component';
import { SpeciesSectionComponent } from '../../../layouts/sections/species-section/species-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';

@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    FilmBasicInfoComponent,
    PeoplesSectionComponent,
    PlanetsSectionComponent,
    StarshipsSectionComponent,
    VehiclesSectionComponent,
    SpeciesSectionComponent,
    DatesSectionComponent,
  ],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
})
export class FilmInfoComponent implements OnInit {
  // Importación de servicios y módulos necesarios
  private filmService = inject(FilmsService); // Inyección del servicio de películas

  constructor(private router: Router, private route: ActivatedRoute) {} // Constructor que inyecta el router y la ruta activada

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    this.obtener(); // Llama al método para obtener información del personaje
    this.count = (await this.filmService.getAll()).count; // Obtiene el conteo total de películas
  }

  // Declaración de variables para almacenar información sobre la película
  filmInfo!: filmsRes; // Variable para almacenar la información de la película

  // Parámetros de la sección de encabezado
  id: number = 0; // ID de la película
  count: number = 0; // Conteo de películas
  name: string = ''; // Nombre de la película

  // Arreglos para almacenar diferentes tipos de información relacionada con la película
  peoples: string[] = []; // Personajes de la película
  planets: string[] = []; // Planetas de la película
  starships: string[] = []; // Naves estelares de la película
  vehicles: string[] = []; // Vehículos de la película
  species: string[] = []; // Especies de la película
  created: string = ''; // Fecha de creación de la película
  edited: string = ''; // Fecha de edición de la película

  // Método para obtener la información de una película
  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params); // Obtiene los parámetros de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP; // Establece el ID de la película

    // Obtener información del personaje utilizando el ID
    this.filmInfo = await this.filmService.getById(this.id); // Llama al servicio para obtener la información de la película
    this.router.navigate(['film', this.id]); // Navega a la ruta de la película

    // Asigna la información obtenida a las variables correspondientes
    this.name = this.filmInfo.title; // Asigna el título de la película
    this.peoples = this.filmInfo.characters; // Asigna los personajes de la película
    this.planets = this.filmInfo.planets; // Asigna los planetas de la película
    this.starships = this.filmInfo.starships; // Asigna las naves estelares de la película
    this.vehicles = this.filmInfo.vehicles; // Asigna los vehículos de la película
    this.species = this.filmInfo.species; // Asigna las especies de la película
    this.created = this.filmInfo.created; // Asigna la fecha de creación de la película
    this.edited = this.filmInfo.edited; // Asigna la fecha de edición de la película
  }
}
