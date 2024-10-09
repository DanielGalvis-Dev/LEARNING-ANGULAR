import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { starshipsResults } from '../../../../../models/starships';
import { ToolsService } from '../../../../../services/tools.service';
import { StarshipsService } from '../../../../../services/starships.service';
import { character } from '../../../../../models/characters';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-starships',
  standalone: true,
  imports: [MatListModule, MatCardModule],
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
      let res = await firstValueFrom(this.starshipsService.obtener(id));
      this.starshipsData.push(res);
    });
  }
}
