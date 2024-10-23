import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FilmsService } from '../../../../../services/films.service';
import { filmsResults } from '../../../../../models/films';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { ToolsService } from '../../../../../services/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-movies',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './character-movies.component.html',
  styleUrl: './character-movies.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

// V2 ----------------------------------------------------------------
export class CharacterMoviesComponent implements OnChanges {
  @Input() characterInfo!: character;
  private filmsService = inject(FilmsService);
  private toolService = inject(ToolsService);
  filmsData: filmsResults[] = [];
  isLoadingNewData = false; // Variable para controlar la carga de nuevos datos
  private router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo'] && changes['characterInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    // Iniciar el estado de carga de nuevos datos
    this.isLoadingNewData = true;

    const filmRequests = this.characterInfo.films.map(async (film) => {
      const id = parseInt(this.toolService.extractOfUrl(film));
      const res = await this.filmsService.obtener(id);
      return res;
    });

    // Esperar a que todos los films nuevos se carguen
    const newFilmsData = await Promise.all(filmRequests);

    // Comparar los arrays de forma simple (longitud y contenido)
    if (!this.areArraysEqual(this.filmsData, newFilmsData)) {
      // Actualizar los datos solo si son diferentes
      this.filmsData = newFilmsData;
    }

    // Finalizar el estado de carga
    this.isLoadingNewData = false;
  }

  // Función para comparar los arrays de forma profunda (si las propiedades del objeto son iguales)
  areArraysEqual(arr1: filmsResults[], arr2: filmsResults[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Comparar cada objeto en el array (comparación profunda)
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].title !== arr2[i].title) {
        return false;
      }
    }

    return true;
  }

  seeFilm(url: string) {
    const id = parseInt(this.toolService.extractOfUrl(url));
    this.router.navigate(['film', id]);
  }
}
