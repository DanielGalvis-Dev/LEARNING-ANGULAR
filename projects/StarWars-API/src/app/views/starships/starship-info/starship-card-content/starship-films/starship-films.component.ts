import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { starshipsResults } from '../../../../../models/starships.model';
import { FilmsService } from '../../../../../services/films.service';
import { ToolsService } from '../../../../../services/tools.service';
import { filmsResults } from '../../../../../models/films.model';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-starship-films',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './starship-films.component.html',
  styleUrl: './starship-films.component.css',
})
export class StarshipFilmsComponent implements OnChanges {
  @Input() starshipInfo!: starshipsResults;
  private filmService = inject(FilmsService);
  private toolService = inject(ToolsService);
  filmsData: filmsResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['starshipInfo'] && changes['starshipInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    const data = this.starshipInfo.films;
    const service = this.filmService.obtener.bind(this.filmService);
    if (data) {
      this.filmsData = await this.toolService.getData(data, service);
    }
  }

  seeFilm(url: string) {
    this.toolService.goLocation(url, 'film');
  }
}
