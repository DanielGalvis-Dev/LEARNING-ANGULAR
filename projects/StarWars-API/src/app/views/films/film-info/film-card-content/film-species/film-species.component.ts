import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films.model';
import { ToolsService } from '../../../../../services/tools.service';
import { SpeciesService } from '../../../../../services/species.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { speciesResults } from '../../../../../models/species.model';

@Component({
  selector: 'app-film-species',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './film-species.component.html',
  styleUrl: './film-species.component.css',
})
export class FilmSpeciesComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  toolService = inject(ToolsService);
  specieService = inject(SpeciesService);
  specieData: speciesResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.filmInfo.species;
    const service = this.specieService.obtener.bind(this.specieService);
    if (data) {
      this.specieData = await this.toolService.getData(data, service);
    }
  }

  seeSpecie(url: string) {
    this.toolService.goLocation(url, 'specie');
  }
}