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
import { PlanetInfoComponent } from './views/planets/planet-info/planet-info.component';
import { SpecieInfoComponent } from './views/species/specie-info/specie-info.component';
import { StarshipInfoComponent } from './views/starships/starship-info/starship-info.component';

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
  { path: 'character/:id', component: CharacterInfoComponent },
  { path: 'planet/:id', component: PlanetInfoComponent },
  { path: 'film/:id', component: FilmInfoComponent },
  { path: 'specie/:id', component: SpecieInfoComponent },
  { path: 'vehicle/:id', component: PlanetInfoComponent },
  { path: 'starship/:id', component: StarshipInfoComponent },
];
