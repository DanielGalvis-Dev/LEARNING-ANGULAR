import { Component, Input } from '@angular/core';
import { vehiclesResults } from '../../../../models/vehicles.model';
import { MatListModule } from '@angular/material/list';
import { VehicleBasicInfoComponent } from "./vehicle-basic-info/vehicle-basic-info.component";
import { VehiclePilotsComponent } from "./vehicle-pilots/vehicle-pilots.component";
import { VehicleFilmsComponent } from "./vehicle-films/vehicle-films.component";
import { VehicleDatesComponent } from "./vehicle-dates/vehicle-dates.component";

@Component({
  selector: 'app-vehicle-card-content',
  standalone: true,
  imports: [MatListModule, VehicleBasicInfoComponent, VehiclePilotsComponent, VehicleFilmsComponent, VehicleDatesComponent],
  templateUrl: './vehicle-card-content.component.html',
  styleUrl: './vehicle-card-content.component.css',
})
export class VehicleCardContentComponent {
  @Input() vehicleInfo!: vehiclesResults;
}
