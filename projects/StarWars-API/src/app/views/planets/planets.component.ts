import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PlanetTableComponent } from "./planet-table/planet-table.component";

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [MatCardModule, PlanetTableComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css'
})
export class PlanetsComponent {

}
