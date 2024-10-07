import { Routes } from '@angular/router';
import { CharacterInfoComponent } from './views/characters/character-info/character-info.component';
import { CharactersComponent } from './views/characters/characters.component';

export const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: 'inicio', component: CharactersComponent },
  { path: 'characterinfo/:id', component: CharacterInfoComponent },
];
