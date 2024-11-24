import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../layouts/table/table.component';
import { PeoplesService } from '../../services/peoples.service';
import { peoplesRes } from '../../models/peoples.model';

@Component({
  selector: 'app-peoples',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.css',
})
export class PeoplesComponent implements OnInit {
  // Inyección del servicio PeoplesService para obtener datos de personas
  private peopleService = inject(PeoplesService);

  // Parámetros del componente
  data: peoplesRes[] = []; // Array para almacenar los datos de las personas
  icon: string = 'person'; // Icono asociado a la entidad "persona"
  location: string = 'people'; // Ubicación o contexto relacionado con las personas
  nextPage: string | null = ''; // URL para la siguiente página de resultados
  prevPage: string | null = ''; // URL para la página anterior de resultados

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener y cargar los datos iniciales
  }

  // Método asíncrono para listar todas las personas
  async list(page: string = '') {
    // Llama al servicio para obtener los datos de las personas, pasando la página como argumento
    const res = await this.peopleService.getAll(page);
    // Almacena las URLs de la página anterior y la siguiente
    this.prevPage = res.previous;
    this.nextPage = res.next;
    // Almacena los resultados en el array 'data'
    this.data = res.results;
  }

  // Método asíncrono para obtener personas por nombre
  async getByname(name: string) {
    // Llama al servicio para obtener los datos de la persona por nombre y almacena los resultados
    this.data = (await this.peopleService.getByName(name)).results;
  }
}
