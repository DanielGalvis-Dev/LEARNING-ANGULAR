import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { starshipsResults } from '../../../../../models/starships.model';
import { ToolsService } from '../../../../../services/tools.service';
import { StarshipsService } from '../../../../../services/starships.service';
import { character } from '../../../../../models/characters.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';

@Component({
  selector: 'app-character-starships',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './character-starships.component.html',
  styleUrl: './character-starships.component.css',
})
export class CharacterStarshipsComponent implements OnChanges {
  @Input() characterInfo!: character;

  starshipsService = inject(StarshipsService);
  toolsService = inject(ToolsService);
  starshipsData: starshipsResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo']) {
      this.listStarships();
    }
  }

  async listStarships() {
    this.starshipsData = [];
    this.characterInfo.starships.forEach(async (starship) => {
      let id = parseInt(this.toolsService.extractOfUrl(starship));
      let res = await this.starshipsService.obtener(id);
      this.starshipsData.push(res);
    });
  }

  seeStarship(url: string) {
    this.toolsService.goLocation(url, 'starship');
  }
}
