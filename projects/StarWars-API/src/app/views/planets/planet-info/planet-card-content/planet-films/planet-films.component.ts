import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { planetsResults } from '../../../../../models/planets.model';
import { ToolsService } from '../../../../../services/tools.service';
import { FilmsService } from '../../../../../services/films.service';
import { Router } from '@angular/router';
import { filmsResults } from '../../../../../models/films.model';

@Component({
  selector: 'app-planet-films',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './planet-films.component.html',
  styleUrl: './planet-films.component.css',
})
export class PlanetFilmsComponent implements OnChanges {
  @Input() planetInfo!: planetsResults;
  private filmsService = inject(FilmsService);
  private toolService = inject(ToolsService);
  filmsData: filmsResults[] = [];
  private router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planetInfo'] && changes['planetInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    const data = this.planetInfo.films;
    const service = this.filmsService.obtener.bind(this.filmsService);
    if (data) {
      this.filmsData = await this.toolService.getData(data, service);
    }
  }

  seeFilm(url: string) {
    this.toolService.goLocation(url, 'film');
  }
}
