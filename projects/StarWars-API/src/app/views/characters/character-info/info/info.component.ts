import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { character } from '../../../../models/characters';
import { CharacterBasicInfoComponent } from './character-basic-info/character-basic-info.component';
import { CharacterMoviesComponent } from './character-movies/character-movies.component';
import { CharacterStarshipsComponent } from './character-starships/character-starships.component';
import { CharacterVehiclesComponent } from './character-vehicles/character-vehicles.component';
import { CharacterDatesComponent } from './character-dates/character-dates.component';
import { CharacterOriginComponent } from './character-origin/character-origin.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatListModule,
    MatGridListModule,
    CharacterBasicInfoComponent,
    CharacterMoviesComponent,
    CharacterStarshipsComponent,
    CharacterVehiclesComponent,
    CharacterDatesComponent,
    CharacterOriginComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  @Input() characterInfo!: character;
}
