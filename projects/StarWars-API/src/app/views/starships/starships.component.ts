import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarshipTableComponent } from './starship-table/starship-table.component';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [MatCardModule, StarshipTableComponent],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css',
})
export class StarshipsComponent {}
