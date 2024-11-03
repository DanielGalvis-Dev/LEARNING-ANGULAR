import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { VehiclesService } from '../../services/vehicles.service';
import { vehiclesRes } from '../../models/vehicles.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  // Importación de servicios necesarios
  private toolService = inject(ToolsService); // Servicio para herramientas
  private vehicleService = inject(VehiclesService); // Servicio para vehículos

  // Parámetros de la clase
  data: vehiclesRes[] = []; // Arreglo para almacenar la respuesta de vehículos
  icon = 'directions_car'; // Icono que representa vehículos
  location = 'vehicle'; // Ubicación o contexto de los vehículos

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método list para obtener la lista de vehículos
  }

  // Método asíncrono para listar todos los vehículos
  async list() {
    // Bind del método getAll del servicio de vehículos para mantener el contexto
    const service = this.vehicleService.getAll.bind(this.vehicleService);

    // Obtiene la cantidad total de vehículos disponibles
    const count = (await this.vehicleService.getAll()).count;

    // Llama al servicio de herramientas para obtener todos los datos de vehículos
    // y los almacena en el arreglo data
    this.data = await this.toolService.allData(service, count);
  }
}
