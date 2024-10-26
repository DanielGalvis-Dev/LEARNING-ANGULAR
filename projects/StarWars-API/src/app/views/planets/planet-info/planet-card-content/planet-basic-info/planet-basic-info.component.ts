import { Component, Input } from '@angular/core';
import { planetsResults } from '../../../../../models/planets.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from "../../../../layouts/section-header/section-header.component";

@Component({
  selector: 'app-planet-basic-info',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './planet-basic-info.component.html',
  styleUrl: './planet-basic-info.component.css',
})
export class PlanetBasicInfoComponent {
  @Input() planetInfo!: planetsResults;
}
