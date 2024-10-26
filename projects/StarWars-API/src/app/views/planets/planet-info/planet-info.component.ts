import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlanetsService } from '../../../services/planets.service';
import { planets, planetsResults } from '../../../models/planets.model';
import { CardHeaderComponent } from '../../layouts/card-header/card-header.component';
import { MatCardModule } from '@angular/material/card';
import { PlanetCardContentComponent } from './planet-card-content/planet-card-content.component';

@Component({
  selector: 'app-planet-info',
  standalone: true,
  imports: [MatCardModule, CardHeaderComponent, PlanetCardContentComponent],
  templateUrl: './planet-info.component.html',
  styleUrl: './planet-info.component.css',
})
export class PlanetInfoComponent {
  private planetService = inject(PlanetsService);
  planetsData: planets = {} as planets;
  planetInfo: planetsResults = {} as planetsResults;

  // Parametros

  // Id
  id: number = 0;

  // Cantidad de Peliculas
  count: number = 0;

  // Nombre de la pelicula
  name: string = '';

  //
  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.obtener();

    // Obtener información del personaje
    this.planetsData = await this.planetService.listar();
    this.count = this.planetsData.count;
  }

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;
    // Obtener información del personaje
    this.planetInfo = await this.planetService.obtener(this.id);
    this.name = this.planetInfo.name;
    this.router.navigate(['planet', this.id]);
    // console.log('Info:', this.planetInfo);
  }
}
