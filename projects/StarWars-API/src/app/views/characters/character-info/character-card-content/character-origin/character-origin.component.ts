import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SpeciesService } from '../../../../../services/species.service';
import { speciesResults } from '../../../../../models/species';
import { character } from '../../../../../models/characters';
import { ToolsService } from '../../../../../services/tools.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { planetsResults } from '../../../../../models/planets';
import { PlanetsService } from '../../../../../services/planets.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';

@Component({
  selector: 'app-character-origin',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './character-origin.component.html',
  styleUrl: './character-origin.component.css',
})
export class CharacterOriginComponent implements OnChanges {
  @Input() characterInfo!: character;

  toolsService = inject(ToolsService);
  speciesService = inject(SpeciesService);
  planetsService = inject(PlanetsService);
  planetsData: planetsResults = {} as planetsResults;
  speciesData: speciesResults = {} as speciesResults;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo']) {
      this.listPlanets();
      this.listSpecies();
    }
  }

  async listPlanets() {
    const platet = this.characterInfo.homeworld.toString();
    if (platet.length > 0) {
      let id = parseInt(this.toolsService.extractOfUrl(platet));
      this.planetsData = await this.planetsService.obtener(id);
      // console.log(this.planetsData);
    }
  }

  async listSpecies() {
    const specie = this.characterInfo.species.toString();
    if (specie.length > 0) {
      let id = parseInt(this.toolsService.extractOfUrl(specie));
      this.speciesData = await this.speciesService.obtener(id);
      // console.log(this.speciesData);
    }
  }
}
