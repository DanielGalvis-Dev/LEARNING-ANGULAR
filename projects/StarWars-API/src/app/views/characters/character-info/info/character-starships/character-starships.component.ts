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
  starshipsCount = 0;
  nextPage: string = '';

  ngOnInit(): void {
    this.listStarships();
  }

  async listStarships() {
    const data = await firstValueFrom(this.starshipsService.listar());
    this.starshipsCount = data.count;
    const count = this.toolsService.readonly(this.starshipsCount);
    for (let i = 0; i < count; i++) {
      const data = await firstValueFrom(
        this.starshipsService.listar(this.nextPage)
      );
      this.starshipsData = this.starshipsData.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }
  }
}
