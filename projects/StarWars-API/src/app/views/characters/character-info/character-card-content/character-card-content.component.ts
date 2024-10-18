import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CharacterBasicInfoComponent } from './character-basic-info/character-basic-info.component';
import { CharacterMoviesComponent } from './character-movies/character-movies.component';
import { CharacterStarshipsComponent } from './character-starships/character-starships.component';
import { CharacterVehiclesComponent } from './character-vehicles/character-vehicles.component';
import { CharacterDatesComponent } from './character-dates/character-dates.component';
import { CharacterOriginComponent } from './character-origin/character-origin.component';
import { character } from '../../../../models/characters';

@Component({
  selector: 'app-character-card-content',
  standalone: true,
  imports: [
    MatListModule,
    CharacterBasicInfoComponent,
    CharacterMoviesComponent,
    CharacterStarshipsComponent,
    CharacterVehiclesComponent,
    CharacterDatesComponent,
    CharacterOriginComponent,
  ],
  templateUrl: './character-card-content.component.html',
  styleUrl: './character-card-content.component.css',
})
export class CharacterCardContentComponent {
  @Input() characterInfo!: character;
}
