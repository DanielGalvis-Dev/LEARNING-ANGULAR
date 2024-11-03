import { Component, inject, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { filmsRes } from '../../models/films.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent implements OnInit {
  // Inyecta el servicio de películas (FilmsService) para poder acceder a sus métodos
  private filmService = inject(FilmsService);

  // Define los parámetros que se utilizarán en la clase
  data: filmsRes[] = []; // Array para almacenar la lista de películas
  icon = 'movie'; // Icono que se utilizará, en este caso, un icono de película
  location = 'film'; // Ubicación o contexto relacionado con las películas

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener la lista de películas al iniciar
  }

  // Método asíncrono para obtener la lista de películas
  async list() {
    // Llama al servicio para obtener todas las películas y asigna el resultado a 'data'
    this.data = (await this.filmService.getAll()).results; // Almacena los resultados en 'data'
  }
}
