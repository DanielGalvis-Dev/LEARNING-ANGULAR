import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
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
  private toolService = inject(ToolsService); // Inyección del servicio de herramientas
  private starshipService = inject(StarshipsService); // Inyección del servicio de naves estelares

  // Parámetros
  data: starshipsRes[] = []; // Array para almacenar los datos de las naves estelares
  icon = 'rocket_launch'; // Icono que representa la funcionalidad (en este caso, un cohete)
  location = 'starship'; // Ubicación o contexto relacionado con las naves estelares

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.list(); // Llama al método list para obtener y mostrar la lista de naves estelares
  }

  // Método asíncrono para obtener la lista de naves estelares
  async list() {
    // Se define el servicio para obtener todas las naves estelares, asegurándose de que el contexto de 'this' sea el correcto
    const service = this.starshipService.getAll.bind(this.starshipService);

    // Se obtiene el conteo total de naves estelares desde el servicio
    const count = (await this.starshipService.getAll()).count;

    // Se llama al servicio de herramientas para obtener todos los datos de las naves estelares, pasando el servicio y el conteo
    this.data = await this.toolService.allData(service, count);
  }
}
