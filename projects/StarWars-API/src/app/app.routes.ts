import { Routes } from '@angular/router';
import { CharacterInfoComponent } from './views/characters/character-info/character-info.component';
import { CharactersComponent } from './views/characters/characters.component';
import { FilmsComponent } from './views/films/films.component';
import { FilmInfoComponent } from './views/films/film-info/film-info.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { PlanetsComponent } from './views/planets/planets.component';
import { SpeciesComponent } from './views/species/species.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';
import { StarshipsComponent } from './views/starships/starships.component';

export const routes: Routes = [
  // { path: '', component: CharactersComponent },
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'characters/:id', component: CharacterInfoComponent },
  { path: 'films/:id', component: FilmInfoComponent },
];
