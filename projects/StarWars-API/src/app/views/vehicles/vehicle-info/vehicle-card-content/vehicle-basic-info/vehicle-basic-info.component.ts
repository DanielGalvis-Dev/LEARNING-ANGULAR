import { Component, Input } from '@angular/core';
import { vehiclesResults } from '../../../../../models/vehicles.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from "../../../../layouts/section-header/section-header.component";

@Component({
  selector: 'app-vehicle-basic-info',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './vehicle-basic-info.component.html',
  styleUrl: './vehicle-basic-info.component.css',
})
export class VehicleBasicInfoComponent {
  @Input() vehicleInfo!: vehiclesResults;
}
