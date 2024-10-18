import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersComponent } from './views/characters/characters.component';
import { HeaderComponent } from './views/layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharactersComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'StarWars-API';
}
