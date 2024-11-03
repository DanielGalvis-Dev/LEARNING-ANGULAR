import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { SpeciesService } from '../../services/species.service';
import { speciesRes } from '../../models/species.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
})
export class SpeciesComponent implements OnInit {
  // Inyectar los servicios necesarios para la funcionalidad
  private toolService = inject(ToolsService);
  private specieService = inject(SpeciesService);

  // Parámetros
  data: speciesRes[] = []; // Array para almacenar los resultados de especies
  icon = 'groups'; // Icono asociado a la funcionalidad
  location = 'specie'; // Ubicación o contexto de la funcionalidad

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llamar al método list para obtener y listar las especies
  }

  // Método asíncrono para obtener la lista de especies
  async list() {
    // Vincular el método getAll del servicio de especies al contexto actual
    const service = this.specieService.getAll.bind(this.specieService);

    // Obtener el conteo total de especies desde el servicio
    const count = (await this.specieService.getAll()).count;

    // Obtener todos los datos utilizando el servicio de herramientas y el conteo obtenido
    this.data = await this.toolService.allData(service, count);
  }
}
