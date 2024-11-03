import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';
import { planetsRes } from '../../../../models/planets.model';

@Component({
  selector: 'app-planet-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './planet-basic-info.component.html',
  styleUrl: './planet-basic-info.component.css',
})
export class PlanetBasicInfoComponent {
  @Input() planetInfo!: planetsRes;
}
