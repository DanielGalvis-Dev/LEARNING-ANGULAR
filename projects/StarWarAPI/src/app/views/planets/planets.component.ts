import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { PlanetsService } from '../../services/planets.service';
import { planetsRes } from '../../models/planets.model';
import { TableComponent } from "../../layouts/table/table.component";

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
})
export class PlanetsComponent implements OnInit {
  // Inyecta los servicios necesarios para la gestión de herramientas y planetas
private toolService = inject(ToolsService);
private planetService = inject(PlanetsService);

// Parámetros de la clase
data: planetsRes[] = []; // Almacena la lista de planetas
icon = 'public'; // Icono que se utilizará en la interfaz
location = 'planet'; // Ubicación o contexto de los datos, en este caso planetas

// Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
ngOnInit(): void {
  this.list(); // Llama al método 'list' para obtener la lista de planetas
}

// Método asíncrono para listar todos los planetas
async list() {
  // Obtiene el método 'getAll' del servicio de planetas y lo vincula al contexto correcto
  const service = this.planetService.getAll.bind(this.planetService);
  
  // Llama al servicio para obtener la cantidad total de planetas
  const count = (await this.planetService.getAll()).count;
  
  // Llama al servicio de herramientas para obtener todos los datos de planetas
  // y los asigna a la propiedad 'data'
  this.data = await this.toolService.allData(service, count);
}
}
