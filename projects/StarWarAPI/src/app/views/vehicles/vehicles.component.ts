import { Component, inject, OnInit } from '@angular/core';
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
  private vehicleService = inject(VehiclesService); // Servicio para vehículos

  // Parámetros de la clase
  data: vehiclesRes[] = []; // Arreglo para almacenar la respuesta de vehículos
  icon = 'directions_car'; // Icono que representa vehículos
  location = 'vehicle'; // Ubicación o contexto de los vehículos
  prevPage: string | null = ''; // Almacena la URL de la página anterior de resultados
  nextPage: string | null = ''; // Almacena la URL de la página siguiente de resultados

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener la lista de vehiculos al inicializar
  }

  // Método asíncrono para listar todos los vehiculos
  async list(page: string = '') {
    // Llama al servicio para obtener los datos de los vehiculos, pasando la página como argumento
    const res = await this.vehicleService.getAll(page);

    // Almacena las URLs de la página anterior y la siguiente en las variables correspondientes
    this.prevPage = res.previous; // URL de la página anterior
    this.nextPage = res.next; // URL de la página siguiente

    // Almacena los resultados obtenidos en el array 'data'
    this.data = res.results; // Lista de vehiculos obtenidos
  }

  // Método asíncrono para obtener vehiculos por nombre
  async getByname(name: string) {
    // Llama al servicio para obtener los datos de un planeta por su nombre
    // Almacena los resultados en el array 'data'
    this.data = (await this.vehicleService.getByName(name)).results; // Lista de vehiculos filtrados por nombre
  }
}
