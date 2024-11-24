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

// Interfaz que define la estructura de un objeto de conteo
export interface Count {
  name: string; // Nombre del elemento
  count: number; // Cantidad de elementos
  class: string; // Clase CSS para estilizar
  page: () => void; // Función para navegar a la página correspondiente
}

@Component({
  selector: 'app-inicio', // Selector del componente
  standalone: true, // Indica que este componente es independiente
  imports: [MatCardModule, MatListModule], // Importaciones de módulos de Angular Material
  templateUrl: './inicio.component.html', // Ruta del archivo de plantilla
  styleUrls: ['./inicio.component.css'], // Ruta del archivo de estilos
})
export class InicioComponent implements OnInit {
  private router = inject(Router); // Inyección del servicio Router
  private toolsService = inject(ToolsService); // Inyección del servicio ToolsService

  // Inyección de servicios para obtener datos
  private peoplesService = inject(PeoplesService);
  private planetsService = inject(PlanetsService);
  private filmsService = inject(FilmsService);
  private speciesService = inject(SpeciesService);
  private vehiclesService = inject(VehiclesService);
  private starshipsService = inject(StarshipsService);

  // Variables para almacenar los conteos de diferentes elementos
  peoplesCount!: number;
  planetsCount!: number;
  filmsCount!: number;
  speciesCount!: number;
  vehiclesCount!: number;
  starshipsCount!: number;

  // Mapeo de nombres de páginas a funciones de navegación
  pages = {
    peoples: () => this.router.navigate(['peoples']),
    planets: () => this.router.navigate(['planets']),
    films: () => this.router.navigate(['films']),
    species: () => this.router.navigate(['species']),
    vehicles: () => this.router.navigate(['vehicles']),
    starships: () => this.router.navigate(['starships']),
  };

  // Arreglo para almacenar los conteos de elementos
  itemsCounts: Count[] = [];

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initializeCounts(); // Inicializa los conteos
  }

  // Método para inicializar los conteos
  async initializeCounts() {
    try {
      await this.fetchCounts(); // Obtiene los conteos
      await this.getAllData(); // Obtiene todos los datos
      this.setupItemCounts(); // Configura los conteos de elementos
    } catch (error) {
      console.error('Error initializing counts', error); // Manejo de errores
    }
  }

  // Método para obtener los conteos de cada servicio
  async fetchCounts() {
    this.peoplesCount = await this.fetchCount(this.peoplesService);
    this.planetsCount = await this.fetchCount(this.planetsService);
    this.filmsCount = await this.fetchCount(this.filmsService);
    this.speciesCount = await this.fetchCount(this.speciesService);
    this.vehiclesCount = await this.fetchCount(this.vehiclesService);
    this.starshipsCount = await this.fetchCount(this.starshipsService);
  }

  // Método genérico para obtener el conteo de un servicio
  async fetchCount(service: any): Promise<number> {
    const res = await service.getAll(); // Llama al método getAll del servicio
    return res.count; // Retorna el conteo
  }

  // Método para obtener todos los datos de cada servicio
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

    // Convierte las URL a IDs utilizando el servicio de herramientas
    const idPeoples = this.toolsService.convertAllUrlToId(peoplesData);
    const idPlanets = this.toolsService.convertAllUrlToId(planetsData);
    const idFilms = this.toolsService.convertAllUrlToId(filmsData);
    const idSpecies = this.toolsService.convertAllUrlToId(speciesData);
    const idVehicles = this.toolsService.convertAllUrlToId(vehiclesData);
    const idStarships = this.toolsService.convertAllUrlToId(starshipsData);

    // Guarda los IDs en el almacenamiento local
    this.saveToLocalStorage(
      idPeoples,
      idPlanets,
      idFilms,
      idSpecies,
      idVehicles,
      idStarships
    );
  }

  // Método para obtener datos de un servicio basado en el conteo
  async fetchData(service: any, count: number): Promise<any> {
    return await this.toolsService.allData(service.getAll.bind(service), count);
  }

  // Método para guardar los IDs en el almacenamiento local
  saveToLocalStorage(
    peoples: number[],
    planets: number[],
    films: number[],
    species: number[],
    vehicles: number[],
    starships: number[]
  ) {
    if (
      this.isBrowser() && // Verifica si está en un navegador
      this.isValidData(peoples, planets, films, species, vehicles, starships) // Verifica la validez de los datos
    ) {
      // Guarda los datos en el almacenamiento local
      localStorage.setItem('ids-people', JSON.stringify(peoples));
      localStorage.setItem('ids-planet', JSON.stringify(planets));
      localStorage.setItem('ids-film', JSON.stringify(films));
      localStorage.setItem('ids-specie', JSON.stringify(species));
      localStorage.setItem('ids-vehicle', JSON.stringify(vehicles));
      localStorage.setItem('ids-starship', JSON.stringify(starships));
    }
  }

  // Método para verificar si se está en un navegador
  isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  // Método para validar que los datos no estén vacíos
  isValidData(...dataArrays: number[][]): boolean {
    return dataArrays.every((arr) => arr.length > 0); // Verifica que cada arreglo tenga elementos
  }

  // Método para configurar los conteos de elementos
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
    ]; // Inicializa el arreglo de conteos de elementos
  }
}
