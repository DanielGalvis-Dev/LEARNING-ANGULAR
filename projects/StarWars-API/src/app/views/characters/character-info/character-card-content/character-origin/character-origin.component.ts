import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SpeciesService } from '../../../../../services/species.service';
import { speciesResults } from '../../../../../models/species.model';
import { character } from '../../../../../models/characters.model';
import { ToolsService } from '../../../../../services/tools.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { planetsResults } from '../../../../../models/planets.model';
import { PlanetsService } from '../../../../../services/planets.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-character-origin',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent, NgClass],
  templateUrl: './character-origin.component.html',
  styleUrl: './character-origin.component.css',
})
export class CharacterOriginComponent implements OnChanges {
  @Input() characterInfo!: character;

  toolService = inject(ToolsService);
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
      let id = parseInt(this.toolService.extractOfUrl(platet));
      this.planetsData = await this.planetsService.obtener(id);
      // console.log(this.planetsData);
    }
  }

  seePlanet(url: string) {
    this.toolService.goLocation(url, 'planet');
  }

  async listSpecies() {
    const specie = this.characterInfo.species.toString();
    if (specie.length > 0) {
      let id = parseInt(this.toolService.extractOfUrl(specie));
      this.speciesData = await this.speciesService.obtener(id);
      // console.log(this.speciesData);
    }
  }

  seeSpecie(url: string) {
    this.toolService.goLocation(url, 'specie');
  }
}
