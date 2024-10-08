import { Component, inject, Input, OnInit } from '@angular/core';
import { FilmsService } from '../../../../../services/films.service';
import { filmsResults } from '../../../../../models/films';
import { firstValueFrom } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters';
import { ToolsService } from '../../../../../services/tools.service';

@Component({
  selector: 'app-character-movies',
  standalone: true,
  imports: [MatListModule, MatCardModule],
  templateUrl: './character-movies.component.html',
  styleUrl: './character-movies.component.css',
})
export class CharacterMoviesComponent implements OnInit {
  @Input() characterInfo!: character;
  filmsService = inject(FilmsService);
  toolsService = inject(ToolsService);
  filmsData: filmsResults[] = [];

  ngOnInit(): void {
    this.getFilms();
  }

  async getFilms() {
    this.characterInfo.films.forEach(async (film) => {
      let id = parseInt(this.toolsService.extractOfUrl(film));
      let res = await firstValueFrom(this.filmsService.obtener(id));
      this.filmsData.push(res);
    });
  }
}
