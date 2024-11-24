import { Component, inject, OnInit } from '@angular/core';
import { StarshipsService } from '../../services/starships.service';
import { starshipsRes } from '../../models/starships.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css',
})
export class StarshipsComponent implements OnInit {
  // Importación de servicios necesarios
  private starshipService = inject(StarshipsService); // Inyección del servicio de naves estelares

  // Parámetros
  data: starshipsRes[] = []; // Array para almacenar los datos de las naves estelares
  icon = 'rocket_launch'; // Icono que representa la funcionalidad (en este caso, un cohete)
  location = 'starship'; // Ubicación o contexto relacionado con las naves estelares
  prevPage: string | null = ''; // Almacena la URL de la página anterior de resultados
  nextPage: string | null = ''; // Almacena la URL de la página siguiente de resultados

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método 'list' para obtener la lista de naves espaciales al inicializar
  }

  // Método asíncrono para listar todos los naves espaciales
  async list(page: string = '') {
    // Llama al servicio para obtener los datos de los naves espaciales, pasando la página como argumento
    const res = await this.starshipService.getAll(page);

    // Almacena las URLs de la página anterior y la siguiente en las variables correspondientes
    this.prevPage = res.previous; // URL de la página anterior
    this.nextPage = res.next; // URL de la página siguiente

    // Almacena los resultados obtenidos en el array 'data'
    this.data = res.results; // Lista de naves espaciales obtenidos
  }

  // Método asíncrono para obtener naves espaciales por nombre
  async getByname(name: string) {
    // Llama al servicio para obtener los datos de un planeta por su nombre
    // Almacena los resultados en el array 'data'
    this.data = (await this.starshipService.getByName(name)).results; // Lista de naves espaciales filtrados por nombre
  }
}
