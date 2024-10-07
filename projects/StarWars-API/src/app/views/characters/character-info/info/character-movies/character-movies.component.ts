import { Component, inject, Input, OnInit } from '@angular/core';
import { FilmsService } from '../../../../../services/films.service';
import { filmsResults } from '../../../../../models/films';
import { firstValueFrom } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters';

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
  filmsData: filmsResults[] = [];

  ngOnInit(): void {
    this.listFilms();
  }

  async listFilms() {
    const data = await firstValueFrom(this.filmsService.listar());
    this.filmsData = data.results;
  }
}
