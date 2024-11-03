import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';
import { vehiclesRes } from '../../../../models/vehicles.model';

@Component({
  selector: 'app-vehicle-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './vehicle-basic-info.component.html',
  styleUrl: './vehicle-basic-info.component.css',
})
export class VehicleBasicInfoComponent {
  @Input() vehicleInfo!: vehiclesRes;
}
