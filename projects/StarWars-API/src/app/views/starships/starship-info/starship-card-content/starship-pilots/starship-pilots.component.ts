import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { starshipsResults } from '../../../../../models/starships.model';
import { character } from '../../../../../models/characters.model';
import { ToolsService } from '../../../../../services/tools.service';
import { CharactersService } from '../../../../../services/characters.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-starship-pilots',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './starship-pilots.component.html',
  styleUrl: './starship-pilots.component.css',
})
export class StarshipPilotsComponent implements OnChanges {
  @Input() starshipInfo!: starshipsResults;
  private characterService = inject(CharactersService);
  private toolService = inject(ToolsService);
  characterData: character[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['starshipInfo'] && changes['starshipInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.starshipInfo.pilots;
    const service = this.characterService.obtener.bind(this.characterService);
    if (data) {
      this.characterData = await this.toolService.getData(data, service);
    }
  }

  seeCharacter(url: string) {
    this.toolService.goLocation(url, 'character');
  }
}
