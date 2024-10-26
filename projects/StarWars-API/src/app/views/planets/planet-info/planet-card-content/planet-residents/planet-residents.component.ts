import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { planetsResults } from '../../../../../models/planets.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { character } from '../../../../../models/characters.model';
import { ToolsService } from '../../../../../services/tools.service';
import { CharactersService } from '../../../../../services/characters.service';

@Component({
  selector: 'app-planet-residents',
  standalone: true,
  imports: [MatCardModule, MatListModule, SectionHeaderComponent],
  templateUrl: './planet-residents.component.html',
  styleUrl: './planet-residents.component.css',
})
export class PlanetResidentsComponent implements OnChanges {
  @Input() planetInfo!: planetsResults;
  private characterService = inject(CharactersService);
  private toolService = inject(ToolsService);
  characterData: character[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planetInfo'] && changes['planetInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.planetInfo.residents;
    const service = this.characterService.obtener.bind(this.characterService);
    if (data) {
      this.characterData = await this.toolService.getData(data, service);
    }
  }

  seeCharacter(url: string) {
    this.toolService.goLocation(url, 'character');
  }
}
