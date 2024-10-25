import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { planetsResults } from '../../../../models/planets';
import { PlanetBasicInfoComponent } from './planet-basic-info/planet-basic-info.component';
import { PlanetResidentsComponent } from './planet-residents/planet-residents.component';
import { PlanetFilmsComponent } from './planet-films/planet-films.component';
import { PlanetDatesComponent } from './planet-dates/planet-dates.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-planet-card-content',
  standalone: true,
  imports: [
    MatListModule,
    PlanetBasicInfoComponent,
    PlanetResidentsComponent,
    PlanetFilmsComponent,
    PlanetDatesComponent,
    NgClass,
  ],
  templateUrl: './planet-card-content.component.html',
  styleUrl: './planet-card-content.component.css',
})
export class PlanetCardContentComponent {
  @Input() planetInfo!: planetsResults;
}
