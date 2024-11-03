import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { PeoplesService } from '../../services/peoples.service';
import { PlanetsService } from '../../services/planets.service';
import { FilmsService } from '../../services/films.service';
import { SpeciesService } from '../../services/species.service';
import { VehiclesService } from '../../services/vehicles.service';
import { StarshipsService } from '../../services/starships.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  // Inyección de dependencias para los servicios de la aplicación
  private router = inject(Router); // Inyecta el servicio Router para la navegación

  private people = inject(PeoplesService); // Inyecta el servicio de personas
  private planets = inject(PlanetsService); // Inyecta el servicio de planetas
  private films = inject(FilmsService); // Inyecta el servicio de películas
  private species = inject(SpeciesService); // Inyecta el servicio de especies
  private vehicles = inject(VehiclesService); // Inyecta el servicio de vehículos
  private starships = inject(StarshipsService); // Inyecta el servicio de naves estelares

  // Variables para almacenar el conteo de diferentes entidades
  peoplesCount!: number; // Conteo de personas
  planetsCount!: number; // Conteo de planetas
  filmsCount!: number; // Conteo de películas
  speciesCount!: number; // Conteo de especies
  vehiclesCount!: number; // Conteo de vehículos
  starshipsCount!: number; // Conteo de naves estelares

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getCounts(); // Llama a la función para obtener los conteos
  }

  // Función asíncrona para obtener los conteos de cada entidad
  async getCounts() {
    // Llama a cada servicio para obtener el conteo y lo asigna a la variable correspondiente
    this.peoplesCount = (await this.people.getAll()).count;
    this.planetsCount = (await this.planets.getAll()).count;
    this.filmsCount = (await this.films.getAll()).count;
    this.speciesCount = (await this.species.getAll()).count;
    this.vehiclesCount = (await this.vehicles.getAll()).count;
    this.starshipsCount = (await this.starships.getAll()).count;
  }

  // Métodos para navegar a diferentes rutas de la aplicación
  seePeoples() {
    this.router.navigate(['peoples']); // Navega a la ruta de personas
  }

  seePlanets() {
    this.router.navigate(['planets']); // Navega a la ruta de planetas
  }

  seeFilms() {
    this.router.navigate(['films']); // Navega a la ruta de películas
  }

  seeSpecies() {
    this.router.navigate(['species']); // Navega a la ruta de especies
  }

  seeVehicles() {
    this.router.navigate(['vehicles']); // Navega a la ruta de vehículos
  }

  seeStarShips() {
    this.router.navigate(['starships']); // Navega a la ruta de naves estelares
  }
}
