import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../layouts/table/table.component';
import { PeoplesService } from '../../services/peoples.service';
import { ToolsService } from '../../services/tools.service';
import { peoplesRes } from '../../models/peoples.model';

@Component({
  selector: 'app-peoples',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.css',
})
export class PeoplesComponent implements OnInit {
  // Inyecta los servicios necesarios para la funcionalidad
  private toolService = inject(ToolsService);
  private peopleService = inject(PeoplesService);

  // Parámetros
  data: peoplesRes[] = []; // Array para almacenar los datos de las personas
  icon = 'person'; // Icono asociado a la entidad "persona"
  location = 'people'; // Ubicación o contexto relacionado con las personas

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener y cargar los datos
  }

  // Método asíncrono para listar todas las personas
  async list() {
    // Se obtiene el método 'getAll' del servicio de personas y se vincula al contexto actual
    const service = this.peopleService.getAll.bind(this.peopleService);

    // Se llama al servicio para obtener el conteo total de personas
    const count = (await this.peopleService.getAll()).count;

    // Se obtienen todos los datos utilizando el servicio de herramientas y se almacenan en 'data'
    this.data = await this.toolService.allData(service, count);
    // console.log(this.data);
    
  }
}
