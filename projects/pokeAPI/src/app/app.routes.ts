import { Routes } from '@angular/router';
import { PokemonsComponent } from './views/pokemons/pokemons.component';

export const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: 'pokemons', component: PokemonsComponent },
];
