import { Component, inject, OnInit } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';
import { planetsRes } from '../../models/planets.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
})
export class PlanetsComponent implements OnInit {
  private planetService = inject(PlanetsService); // Servicio para gestionar planetas

  // Parámetros de la clase
  data: planetsRes[] = []; // Almacena la lista de planetas
  icon = 'public'; // Icono que se utilizará en la interfaz para representar planetas
  location = 'planet'; // Ubicación o contexto de los datos, en este caso se refiere a planetas
  prevPage: string | null = ''; // Almacena la URL de la página anterior de resultados
  nextPage: string | null = ''; // Almacena la URL de la página siguiente de resultados

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener la lista de planetas al inicializar
  }

  // Método asíncrono para listar todos los planetas
  async list(page: string = '') {
    // Llama al servicio para obtener los datos de los planetas, pasando la página como argumento
    const res = await this.planetService.getAll(page);

    // Almacena las URLs de la página anterior y la siguiente en las variables correspondientes
    this.prevPage = res.previous; // URL de la página anterior
    this.nextPage = res.next; // URL de la página siguiente

    // Almacena los resultados obtenidos en el array 'data'
    this.data = res.results; // Lista de planetas obtenidos
  }

  // Método asíncrono para obtener planetas por nombre
  async getByname(name: string) {
    // Llama al servicio para obtener los datos de un planeta por su nombre
    // Almacena los resultados en el array 'data'
    this.data = (await this.planetService.getByName(name)).results; // Lista de planetas filtrados por nombre
  }
}
