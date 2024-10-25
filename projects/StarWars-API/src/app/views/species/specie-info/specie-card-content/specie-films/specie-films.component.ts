import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { speciesResults } from '../../../../../models/species';
import { FilmsService } from '../../../../../services/films.service';
import { ToolsService } from '../../../../../services/tools.service';
import { filmsResults } from '../../../../../models/films';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from "../../../../layouts/section-header/section-header.component";

@Component({
  selector: 'app-specie-films',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './specie-films.component.html',
  styleUrl: './specie-films.component.css',
})
export class SpecieFilmsComponent implements OnChanges {
  @Input() specieInfo!: speciesResults;

  private filmsService = inject(FilmsService);
  private toolService = inject(ToolsService);
  filmsData: filmsResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specieInfo'] && changes['specieInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    const data = this.specieInfo.films;
    const service = this.filmsService.obtener.bind(this.filmsService);
    if (data) {
      this.filmsData = await this.toolService.getData(data, service);
    }
  }

  seeFilm(url: string) {
    this.toolService.goLocation(url, 'film');
  }
}
