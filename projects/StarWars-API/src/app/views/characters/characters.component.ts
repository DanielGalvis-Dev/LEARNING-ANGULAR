import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CharaterTableComponent } from './charater-table/charater-table.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [MatCardModule, CharaterTableComponent],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent {}
