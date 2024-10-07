import { Component, inject, Input, OnInit } from '@angular/core';
import { SpeciesService } from '../../../../../services/species.service';
import { speciesResults } from '../../../../../models/species';
import { character } from '../../../../../models/characters';
import { firstValueFrom } from 'rxjs';
import { ToolsService } from '../../../../../services/tools.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { planetsResults } from '../../../../../models/planets';
import { PlanetsService } from '../../../../../services/planets.service';

@Component({
  selector: 'app-character-origin',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './character-origin.component.html',
  styleUrl: './character-origin.component.css',
})
export class CharacterOriginComponent implements OnInit {
  @Input() characterInfo!: character;

  speciesService = inject(SpeciesService);
  toolsService = inject(ToolsService);
  speciesData: speciesResults[] = [];
  speciesCount = 0;
  nextPage: string = '';

  ngOnInit(): void {
    this.listPlanets();
    this.listSpecies();
  }

  async listSpecies() {
    const data = await firstValueFrom(this.speciesService.listar());
    this.speciesCount = data.count;
    const count = this.toolsService.readonly(this.speciesCount);
    for (let i = 0; i < count; i++) {
      const data = await firstValueFrom(
        this.speciesService.listar(this.nextPage)
      );
      this.speciesData = this.speciesData.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }
  }

  planetsService = inject(PlanetsService);
  planetsData: planetsResults[] = [];
  planetsCount = 0;

  async listPlanets() {
    const data = await firstValueFrom(this.planetsService.listar());
    this.planetsCount = data.count;
    const count = this.toolsService.readonly(this.planetsCount);
    for (let i = 0; i < count; i++) {
      const data = await firstValueFrom(
        this.planetsService.listar(this.nextPage)
      );
      this.planetsData = this.planetsData.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }
  }
}
