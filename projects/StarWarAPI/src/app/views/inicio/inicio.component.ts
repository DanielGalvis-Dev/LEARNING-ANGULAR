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
import { ToolsService } from '../../services/tools.service';
export interface counts {
  name: string;
  count: number;
  class: string;
  page: () => void;
}
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  // Inyección de dependencias para los servicios de la aplicación
  private router = inject(Router);
  private toolsService = inject(ToolsService);

  private peoplesService = inject(PeoplesService);
  private planetsService = inject(PlanetsService);
  private filmsService = inject(FilmsService);
  private speciesService = inject(SpeciesService);
  private vehiclesService = inject(VehiclesService);
  private starshipsService = inject(StarshipsService);

  // Variables para almacenar el conteo de diferentes entidades
  peoplesCount!: number;
  planetsCount!: number;
  filmsCount!: number;
  speciesCount!: number;
  vehiclesCount!: number;
  starshipsCount!: number;

  // Métodos para navegar a diferentes rutas de la aplicación
  pages = {
    peoples: () => this.router.navigate(['peoples']),
    planets: () => this.router.navigate(['planets']),
    films: () => this.router.navigate(['films']),
    species: () => this.router.navigate(['species']),
    vehicles: () => this.router.navigate(['vehicles']),
    starships: () => this.router.navigate(['starships']),
  };

  itemsCounts: counts[] = [];

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getCounts();
  }

  // Función asíncrona para obtener los conteos de cada entidad
  async getCounts() {
    // Obtener conteos de cada servicio y asignarlos a las variables correspondientes
    this.peoplesCount = (await this.peoplesService.getAll()).count;
    this.planetsCount = (await this.planetsService.getAll()).count;
    this.filmsCount = (await this.filmsService.getAll()).count;
    this.speciesCount = (await this.speciesService.getAll()).count;
    this.vehiclesCount = (await this.vehiclesService.getAll()).count;
    this.starshipsCount = (await this.starshipsService.getAll()).count;

    this.setupItemCounts();
    this.getAllData();
  }

  async getAllData() {
    // Obtener datos de todas las entidades utilizando el servicio ToolsService
    const peoplesData = await this.toolsService.allData(
      this.peoplesService.getAll.bind(this.peoplesService),
      this.peoplesCount
    );
    const planetsData = await this.toolsService.allData(
      this.planetsService.getAll.bind(this.planetsService),
      this.planetsCount
    );
    const filmsData = (await this.filmsService.getAll()).results;
    const speciesData = await this.toolsService.allData(
      this.speciesService.getAll.bind(this.speciesService),
      this.speciesCount
    );
    const vehiclesData = await this.toolsService.allData(
      this.vehiclesService.getAll.bind(this.vehiclesService),
      this.vehiclesCount
    );
    const starshipsData = await this.toolsService.allData(
      this.starshipsService.getAll.bind(this.starshipsService),
      this.starshipsCount
    );

    // Convertir URLs a IDs utilizando el servicio ToolsService
    const idPeoples = this.toolsService.convertAllUrlToId(peoplesData);
    const idPlanets = this.toolsService.convertAllUrlToId(planetsData);
    const idFilms = this.toolsService.convertAllUrlToId(filmsData);
    const idSpecies = this.toolsService.convertAllUrlToId(speciesData);
    const idVehicles = this.toolsService.convertAllUrlToId(vehiclesData);
    const idStarships = this.toolsService.convertAllUrlToId(starshipsData);

    // Guardar los datos en el almacenamiento local
    this.saveToLocalStorage(
      idPeoples,
      idPlanets,
      idFilms,
      idSpecies,
      idVehicles,
      idStarships
    );
  }

  saveToLocalStorage(
    peoples: number[],
    planets: number[],
    films: number[],
    species: number[],
    vehicles: number[],
    starships: number[]
  ) {
    if (
      peoples.length &&
      planets.length &&
      films.length &&
      species.length &&
      vehicles.length &&
      starships.length
    ) {
      // Guarda los ids actuales en el localStorage
      localStorage.setItem('ids-people', JSON.stringify(peoples));
      localStorage.setItem('ids-planet', JSON.stringify(planets));
      localStorage.setItem('ids-film', JSON.stringify(films));
      localStorage.setItem('ids-specie', JSON.stringify(species));
      localStorage.setItem('ids-vehicle', JSON.stringify(vehicles));
      localStorage.setItem('ids-starship', JSON.stringify(starships));
    }
  }

  setupItemCounts() {
    this.itemsCounts = [
      {
        name: 'peoples',
        count: this.peoplesCount,
        class: 'item peoples-count',
        page: this.pages.peoples,
      },
      {
        name: 'planets',
        count: this.planetsCount,
        class: 'item planets-count',
        page: this.pages.planets,
      },
      {
        name: 'films',
        count: this.filmsCount,
        class: 'item films-count',
        page: this.pages.films,
      },
      {
        name: 'species',
        count: this.speciesCount,
        class: 'item species-count',
        page: this.pages.species,
      },
      {
        name: 'vehicles',
        count: this.vehiclesCount,
        class: 'item vehicles-count',
        page: this.pages.vehicles,
      },
      {
        name: 'starships',
        count: this.starshipsCount,
        class: 'item starships-count',
        page: this.pages.starships,
      },
    ];
  }
}
