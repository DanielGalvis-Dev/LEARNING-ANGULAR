import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { vehiclesRes } from '../../../models/vehicles.model';
import { ToolsService } from '../../../services/tools.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-vehicles-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './vehicles-section.component.html',
  styleUrl: './vehicles-section.component.css',
})
export class VehiclesSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('vehicles') vehicles!: string[]; // Lista de planetas que se recibirán como entrada
  @Input('title') title: string = 'VEHICLES'; // Título por defecto del componente
  @Input('icon') icon: string = 'directions_car'; // Icono por defecto del componente

  // Inyecta los servicios necesarios
  toolService = inject(ToolsService);
  vehicleService = inject(VehiclesService);

  // Array para almacenar los datos de los vehículos
  vehicleData: vehiclesRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hay cambios en la propiedad 'vehicles' y si tiene un valor actual
    if (changes['vehicles'] && changes['vehicles'].currentValue) {
      // Llama al método obtener para obtener los datos de los vehículos
      this.obtener();
    }
  }

  // Método asíncrono para obtener los datos de los vehículos
  async obtener() {
    // Se obtiene una referencia al método 'getById' del servicio de vehículos
    const service = this.vehicleService.getById.bind(this.vehicleService);

    // Verifica si hay vehículos en el array 'vehicles'
    if (this.vehicles.length > 0) {
      // Llama al método 'getData' del servicio de herramientas para obtener los datos
      // y los almacena en 'vehicleData'
      this.vehicleData = await this.toolService.getData(this.vehicles, service);
    }
  }

  // Método para ver los detalles de un vehículo
  seeVehicle(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'vehicle'); // Redirigimos a la ubicación del vehiculo
    }
  }
}
