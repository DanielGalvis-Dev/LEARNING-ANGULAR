import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VehicleTableComponent } from "./vehicle-table/vehicle-table.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [MatCardModule, VehicleTableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent {}
