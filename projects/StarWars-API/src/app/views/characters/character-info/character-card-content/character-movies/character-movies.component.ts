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
  private router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo'] && changes['characterInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    const filmRequests = this.characterInfo.films.map(async (film) => {
      const id = parseInt(this.toolService.extractOfUrl(film));
      const res = await this.filmsService.obtener(id);
      return res;
    });

    // Esperar a que todos los films nuevos se carguen
    const newFilmsData = await Promise.all(filmRequests);
    this.filmsData = newFilmsData;
  }

  seeFilm(url: string) {
    this.toolService.goLocation(url, 'film');
  }
}
