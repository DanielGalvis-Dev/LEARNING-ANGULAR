import { Routes } from '@angular/router';
import path from 'node:path';
import { PeoplesSectionComponent } from './layouts/peoples-section/peoples-section.component';
import { PlanetsSectionComponent } from './layouts/planets-section/planets-section.component';
import { FilmsSectionComponent } from './layouts/films-section/films-section.component';
import { SpeciesSectionComponent } from './layouts/species-section/species-section.component';
import { VehiclesSectionComponent } from './layouts/vehicles-section/vehicles-section.component';
import { StarshipsSectionComponent } from './layouts/starships-section/starships-section.component';
import { PeoplesComponent } from './views/peoples/peoples.component';
import { PlanetsComponent } from './views/planets/planets.component';
import { FilmsComponent } from './views/films/films.component';
import { SpeciesComponent } from './views/species/species.component';
import { StarshipsComponent } from './views/starships/starships.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';

export const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: 'peoples', component: PeoplesComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  // { path: '', component: PeoplesSectionComponent },
  //   { path: '', component: PlanetsSectionComponent },
  //   { path: '', component: FilmsSectionComponent },
  //   { path: '', component: SpeciesSectionComponent },
  //   { path: '', component: VehiclesSectionComponent },
  //   { path: '', component: StarshipsSectionComponent },
];
