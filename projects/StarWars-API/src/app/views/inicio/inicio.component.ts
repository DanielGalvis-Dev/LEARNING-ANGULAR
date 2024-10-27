import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
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
  private router = inject(Router);

  character = inject(CharactersService);
  planets = inject(PlanetsService);
  films = inject(FilmsService);
  species = inject(SpeciesService);
  vehicles = inject(VehiclesService);
  starships = inject(StarshipsService);

  charactersCount!: number;
  planetsCount!: number;
  filmsCount!: number;
  speciesCount!: number;
  vehiclesCount!: number;
  starshipsCount!: number;

  ngOnInit(): void {
    this.getCounts();
  }

  async getCounts() {
    this.charactersCount = (await this.character.listar()).count;
    this.planetsCount = (await this.planets.listar()).count;
    this.filmsCount = (await this.films.listar()).count;
    this.speciesCount = (await this.species.listar()).count;
    this.vehiclesCount = (await this.vehicles.listar()).count;
    this.starshipsCount = (await this.starships.listar()).count;
  }

  seePeoples() {
    this.router.navigate(['characters']);
  }

  seePlanets() {
    this.router.navigate(['planets']);
  }

  seeFilms() {
    this.router.navigate(['films']);
  }

  seeSpecies() {
    this.router.navigate(['species']);
  }

  seeVehicles() {
    this.router.navigate(['vehicles']);
  }

  seeStarShips() {
    this.router.navigate(['starships']);
  }
}
