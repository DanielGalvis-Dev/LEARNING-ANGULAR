import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { speciesResults } from '../../../../../models/species';
import { CharactersService } from '../../../../../services/characters.service';
import { ToolsService } from '../../../../../services/tools.service';
import { character } from '../../../../../models/characters';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-specie-characters',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './specie-characters.component.html',
  styleUrl: './specie-characters.component.css',
})
export class SpecieCharactersComponent implements OnChanges {
  @Input() specieInfo!: speciesResults;
  private characterService = inject(CharactersService);
  private toolService = inject(ToolsService);
  characterData: character[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specieInfo'] && changes['specieInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.specieInfo.people;
    const service = this.characterService.obtener.bind(this.characterService);
    if (data) {
      this.characterData = await this.toolService.getData(data, service);
    }
  }

  seeCharacter(url: string) {
    this.toolService.goLocation(url, 'character');
  }
}
