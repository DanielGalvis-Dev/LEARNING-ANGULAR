import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { filmsRes } from '../../../models/films.model';
import { FilmsService } from '../../../services/films.service';
import { ToolsService } from '../../../services/tools.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-films-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './films-section.component.html',
  styleUrl: './films-section.component.css',
})
export class FilmsSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('films') films!: string[];
  @Input('title') title: string = 'FILMS';
  @Input('icon') icon: string = 'movie';

  // Servicios
  private filmsService = inject(FilmsService);
  private toolService = inject(ToolsService);

  // Array que contendrá los datos de los filmes
  filmsData: filmsRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hay cambios en la propiedad 'films' y si tiene un valor actual
    if (changes['films'] && changes['films'].currentValue) {
      // Llama al método para obtener los filmes
      this.getFilms();
    }
  }

  // Método asíncrono para obtener los filmes
  async getFilms() {
    // Se vincula el método 'getOne' del servicio de filmes al contexto actual
    const service = this.filmsService.getOne.bind(this.filmsService);

    // Verifica si hay datos en la propiedad 'films'
    if (this.films) {
      // Llama al servicio para obtener los datos de los filmes y los almacena en 'filmsData'
      this.filmsData = await this.toolService.getData(this.films, service);
    }
  }

  // Método para ver un filme, redirige a la URL proporcionada
  seeFilm(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'film'); // Redirigimos a la ubicación de la pelicula
    }
  }
}
