import { Component } from '@angular/core';
import { FilmTableComponent } from './film-table/film-table.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [FilmTableComponent, MatCardModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent {}
