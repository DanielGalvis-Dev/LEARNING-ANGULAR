import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarshipsService } from '../../../services/starships.service';
import { starships, starshipsResults } from '../../../models/starships.model';
import { firstValueFrom } from 'rxjs';
import { CardHeaderComponent } from '../../layouts/card-header/card-header.component';
import { StarshipCardContentComponent } from './starship-card-content/starship-card-content.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-starship-info',
  standalone: true,
  imports: [CardHeaderComponent, StarshipCardContentComponent, MatCardModule],
  templateUrl: './starship-info.component.html',
  styleUrl: './starship-info.component.css',
})
export class StarshipInfoComponent {
  private starshipService = inject(StarshipsService);
  starshipsData: starships = {} as starships;
  starshipInfo: starshipsResults = {} as starshipsResults;

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
    this.starshipsData = await this.starshipService.listar();
    this.count = this.starshipsData.count;
  }

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;
    // Obtener información del personaje
    this.starshipInfo = await this.starshipService.obtener(this.id);
    this.name = this.starshipInfo.name;
    this.router.navigate(['starship', this.id]);
    // console.log('Info:', this.starshipInfo);
  }
}
