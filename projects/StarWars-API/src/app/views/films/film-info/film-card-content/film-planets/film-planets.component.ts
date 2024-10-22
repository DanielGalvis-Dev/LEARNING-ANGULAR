import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ToolsService } from '../../../../../services/tools.service';
import { PlanetsService } from '../../../../../services/planets.service';

@Component({
  selector: 'app-film-planets',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './film-planets.component.html',
  styleUrl: './film-planets.component.css',
})
export class FilmPlanetsComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  toolService = inject(ToolsService);
  planetService = inject(PlanetsService);
  planetNames: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.filmInfo.planets;
    const service = this.planetService.obtener.bind(this.planetService);
    if (data) {
      this.planetNames = (await this.toolService.getData(data, service)).map(
        (data) => data.name
      );
    }
  }
}
