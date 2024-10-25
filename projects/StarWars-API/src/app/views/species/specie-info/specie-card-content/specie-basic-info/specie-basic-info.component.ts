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
import { speciesResults } from '../../../../../models/species';
import { ToolsService } from '../../../../../services/tools.service';
import { PlanetsService } from '../../../../../services/planets.service';

@Component({
  selector: 'app-specie-basic-info',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './specie-basic-info.component.html',
  styleUrl: './specie-basic-info.component.css',
})
export class SpecieBasicInfoComponent implements OnChanges {
  @Input() specieInfo!: speciesResults;
  private toolService = inject(ToolsService);
  private planetService = inject(PlanetsService);

  // Variables
  homeworld: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specieInfo'] && changes['specieInfo'].currentValue) {
      this.getPlanet();
    }
  }

  async getPlanet() {
    if (this.specieInfo.homeworld) {
      const url = this.specieInfo.homeworld;
      const id = parseInt(this.toolService.extractOfUrl(url));
      this.homeworld = (await this.planetService.obtener(id)).name;
    }
  }

  seePlanet(url: string) {
    this.toolService.goLocation(url, 'planet');
  }
}
