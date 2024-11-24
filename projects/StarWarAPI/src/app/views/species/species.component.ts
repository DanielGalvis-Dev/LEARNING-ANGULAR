import { Component, inject, OnInit } from '@angular/core';
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
  private specieService = inject(SpeciesService); // Servicio para obtener datos de especies, inyectado para su uso

  // Parámetros
  data: speciesRes[] = []; // Array para almacenar los resultados de especies
  icon = 'groups'; // Icono asociado a la funcionalidad, utilizado en la interfaz de usuario
  location = 'specie'; // Ubicación o contexto de la funcionalidad, puede ser usado para rutas o navegación
  prevPage: string | null = ''; // Almacena la URL de la página anterior para la paginación
  nextPage: string | null = ''; // Almacena la URL de la siguiente página para la paginación

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método list para obtener y listar las especies al iniciar el componente
  }

  // Método asíncrono para obtener la lista de especies
  async list(page: string = '') {
    // Llama al servicio para obtener los datos de las especies, pasando la página como argumento
    const res = await this.specieService.getAll(page);
    // Almacena las URLs de la página anterior y la siguiente, para la paginación
    this.prevPage = res.previous; // URL de la página anterior
    this.nextPage = res.next; // URL de la siguiente página
    // Almacena los resultados en el array 'data', que se usará para mostrar las especies
    this.data = res.results; // Resultados de especies obtenidos del servicio
  }

  // Método asíncrono para obtener especies por nombre
  async getByname(name: string) {
    // Llama al servicio para obtener los datos de la especie por nombre y almacena los resultados
    this.data = (await this.specieService.getByName(name)).results; // Almacena los resultados filtrados por nombre en 'data'
  }
}
