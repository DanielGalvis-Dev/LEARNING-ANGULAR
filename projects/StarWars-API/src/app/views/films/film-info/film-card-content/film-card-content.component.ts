import { Component, Input } from '@angular/core';
import { FilmBasicInfoComponent } from './film-basic-info/film-basic-info.component';
import { FilmCharactersComponent } from './film-characters/film-characters.component';
import { FilmPlanetsComponent } from './film-planets/film-planets.component';
import { FilmSpeciesComponent } from './film-species/film-species.component';
import { FilmStarshipsComponent } from './film-starships/film-starships.component';
import { FilmDatesComponent } from './film-dates/film-dates.component';
import { MatListModule } from '@angular/material/list';
import { CharacterBasicInfoComponent } from '../../../characters/character-info/character-card-content/character-basic-info/character-basic-info.component';
import { FilmVehiclesComponent } from './film-vehicles/film-vehicles.component';
import { filmsResults } from '../../../../models/films.model';

@Component({
  selector: 'app-film-card-content',
  standalone: true,
  imports: [
    FilmBasicInfoComponent,
    FilmDatesComponent,
    FilmCharactersComponent,
    FilmPlanetsComponent,
    FilmPlanetsComponent,
    FilmSpeciesComponent,
    FilmStarshipsComponent,
    MatListModule,
    FilmVehiclesComponent,
  ],
  templateUrl: './film-card-content.component.html',
  styleUrl: './film-card-content.component.css',
})
export class FilmCardContentComponent {
  @Input() filmInfo!: filmsResults;
}
