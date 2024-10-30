import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { VehiclesService } from '../../services/vehicles.service';
import { vehiclesRes } from '../../models/vehicles.model';
import { TableComponent } from "../../layouts/table/table.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  private toolService = inject(ToolsService);
  private vehicleService = inject(VehiclesService);

  // Parametros
  data: vehiclesRes[] = [];
  icon = 'directions_car';
  location = 'vehicle';

  ngOnInit(): void {
    this.list();
  }

  async list() {
    const service = this.vehicleService.getAll.bind(this.vehicleService);
    const count = (await this.vehicleService.getAll()).count;
    this.data = await this.toolService.allData(service, count);
  }
}
