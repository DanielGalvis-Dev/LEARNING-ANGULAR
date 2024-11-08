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

export interface Count {
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
  private router = inject(Router);
  private toolsService = inject(ToolsService);

  private peoplesService = inject(PeoplesService);
  private planetsService = inject(PlanetsService);
  private filmsService = inject(FilmsService);
  private speciesService = inject(SpeciesService);
  private vehiclesService = inject(VehiclesService);
  private starshipsService = inject(StarshipsService);

  peoplesCount!: number;
  planetsCount!: number;
  filmsCount!: number;
  speciesCount!: number;
  vehiclesCount!: number;
  starshipsCount!: number;

  pages = {
    peoples: () => this.router.navigate(['peoples']),
    planets: () => this.router.navigate(['planets']),
    films: () => this.router.navigate(['films']),
    species: () => this.router.navigate(['species']),
    vehicles: () => this.router.navigate(['vehicles']),
    starships: () => this.router.navigate(['starships']),
  };

  itemsCounts: Count[] = [];

  ngOnInit(): void {
    this.initializeCounts();
  }

  async initializeCounts() {
    try {
      await this.fetchCounts();
      await this.getAllData();
      this.setupItemCounts();
    } catch (error) {
      console.error('Error initializing counts', error);
    }
  }

  async fetchCounts() {
    this.peoplesCount = await this.fetchCount(this.peoplesService);
    this.planetsCount = await this.fetchCount(this.planetsService);
    this.filmsCount = await this.fetchCount(this.filmsService);
    this.speciesCount = await this.fetchCount(this.speciesService);
    this.vehiclesCount = await this.fetchCount(this.vehiclesService);
    this.starshipsCount = await this.fetchCount(this.starshipsService);
  }

  async fetchCount(service: any): Promise<number> {
    const res = await service.getAll();
    return res.count;
  }

  async getAllData() {
    const peoplesData = await this.fetchData(
      this.peoplesService,
      this.peoplesCount
    );
    const planetsData = await this.fetchData(
      this.planetsService,
      this.planetsCount
    );
    const filmsData = (await this.filmsService.getAll()).results;
    const speciesData = await this.fetchData(
      this.speciesService,
      this.speciesCount
    );
    const vehiclesData = await this.fetchData(
      this.vehiclesService,
      this.vehiclesCount
    );
    const starshipsData = await this.fetchData(
      this.starshipsService,
      this.starshipsCount
    );

    const idPeoples = this.toolsService.convertAllUrlToId(peoplesData);
    const idPlanets = this.toolsService.convertAllUrlToId(planetsData);
    const idFilms = this.toolsService.convertAllUrlToId(filmsData);
    const idSpecies = this.toolsService.convertAllUrlToId(speciesData);
    const idVehicles = this.toolsService.convertAllUrlToId(vehiclesData);
    const idStarships = this.toolsService.convertAllUrlToId(starshipsData);

    // console.log(
    //   idPeoples,
    //   idPlanets,
    //   idFilms,
    //   idSpecies,
    //   idVehicles,
    //   idStarships
    // );
    
    this.saveToLocalStorage(
      idPeoples,
      idPlanets,
      idFilms,
      idSpecies,
      idVehicles,
      idStarships
    );
  }

  async fetchData(service: any, count: number): Promise<any> {
    return await this.toolsService.allData(service.getAll.bind(service), count);
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
      this.isBrowser() &&
      this.isValidData(peoples, planets, films, species, vehicles, starships)
    ) {
      localStorage.setItem('ids-people', JSON.stringify(peoples));
      localStorage.setItem('ids-planet', JSON.stringify(planets));
      localStorage.setItem('ids-film', JSON.stringify(films));
      localStorage.setItem('ids-specie', JSON.stringify(species));
      localStorage.setItem('ids-vehicle', JSON.stringify(vehicles));
      localStorage.setItem('ids-starship', JSON.stringify(starships));
    }
  }

  isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  isValidData(...dataArrays: number[][]): boolean {
    return dataArrays.every((arr) => arr.length > 0);
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
