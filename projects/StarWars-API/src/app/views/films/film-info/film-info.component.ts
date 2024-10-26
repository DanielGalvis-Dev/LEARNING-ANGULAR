import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { films, filmsResults } from '../../../models/films.model';
import { FilmsService } from '../../../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../layouts/card-header/card-header.component';
import { FilmCardContentComponent } from "./film-card-content/film-card-content.component";

@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [MatCardModule, CardHeaderComponent, FilmCardContentComponent],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
})
export class FilmInfoComponent {
  private filmService = inject(FilmsService);
  filmsData: films = {} as films;
  filmInfo: filmsResults = {} as filmsResults;

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
    this.filmsData = await this.filmService.listar();
    this.count = this.filmsData.count;
  }

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;
    // Obtener información del personaje
    this.filmInfo = await this.filmService.obtener(this.id);
    this.name = this.filmInfo.title;
    this.router.navigate(['film', this.id]);
    // console.log('Info:', this.filmInfo);
  }
}
