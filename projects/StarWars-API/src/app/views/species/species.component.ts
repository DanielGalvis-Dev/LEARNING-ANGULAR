import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SpecieTableComponent } from "./specie-table/specie-table.component";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [MatCardModule, SpecieTableComponent],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
})
export class SpeciesComponent {}
