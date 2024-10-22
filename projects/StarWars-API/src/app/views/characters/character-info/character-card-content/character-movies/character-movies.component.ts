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
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';

@Component({
  selector: 'app-character-movies',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './character-movies.component.html',
  styleUrl: './character-movies.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

// V1 ----------------------------------------------------------------
// export class CharacterMoviesComponent implements OnChanges {
//   @Input() characterInfo!: character;
//   filmsService = inject(FilmsService);
//   toolsService = inject(ToolsService);
//   filmsData: filmsResults[] = [];
//   isLoadingNewData = false; // Variable para controlar la carga de nuevos datos

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['characterInfo'] && changes['characterInfo'].currentValue) {
//       this.getFilms();
//     }
//   }

//   async getFilms() {
//     const newData = this.characterInfo.films.map(async (film) => {
//       const id = parseInt(this.toolsService.extractOfUrl(film));
//       const res = await this.filmsService.obtener(id);
//       return res;
//     });
//     const newFilmsData = await Promise.all(newData);
//     if (newFilmsData !== this.filmsData) {
//       this.filmsData = newFilmsData;
//     }
//   }
// }

// V2 ----------------------------------------------------------------
export class CharacterMoviesComponent implements OnChanges {
  @Input() characterInfo!: character;
  filmsService = inject(FilmsService);
  toolsService = inject(ToolsService);
  filmsData: filmsResults[] = [];
  isLoadingNewData = false; // Variable para controlar la carga de nuevos datos

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo'] && changes['characterInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    // Iniciar el estado de carga de nuevos datos
    this.isLoadingNewData = true;

    const filmRequests = this.characterInfo.films.map(async (film) => {
      const id = parseInt(this.toolsService.extractOfUrl(film));
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
}
