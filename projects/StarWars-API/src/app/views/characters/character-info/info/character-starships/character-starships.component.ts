import { Component, inject, Input, OnInit } from '@angular/core';
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
export class CharacterStarshipsComponent implements OnInit {
  @Input() characterInfo!: character;

  starshipsService = inject(StarshipsService);
  toolsService = inject(ToolsService);
  starshipsData: starshipsResults[] = [];

  ngOnInit(): void {
    this.listStarships();
  }

  async listStarships() {
    this.characterInfo.starships.forEach(async (starship) => {
      let id = parseInt(this.toolsService.extractOfUrl(starship));
      let res = await firstValueFrom(this.starshipsService.obtener(id));
      this.starshipsData.push(res);
    });
  }
}
