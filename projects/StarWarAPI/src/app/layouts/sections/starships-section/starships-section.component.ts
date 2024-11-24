import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { starshipsRes } from '../../../models/starships.model';
import { StarshipsService } from '../../../services/starships.service';
import { ToolsService } from '../../../services/tools.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-starships-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './starships-section.component.html',
  styleUrl: './starships-section.component.css',
})
export class StarshipsSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('starships') starships!: string[]; // Lista de naves espaciales que se recibirán como entrada
  @Input('title') title: string = 'STARSHIPS'; // Título por defecto del componente
  @Input('icon') icon: string = 'rocket_launch'; // Icono por defecto del componente

  // Inyecta los servicios necesarios
  toolService = inject(ToolsService);
  starshipService = inject(StarshipsService);

  // Array para almacenar los datos de las naves estelares.
  starshipsData: starshipsRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades del componente.
  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos si hay cambios en la propiedad 'starships' y si tiene un valor actual.
    if (changes['starships'] && changes['starships'].currentValue) {
      // Llamamos al método 'obtener' para obtener los datos de las naves estelares.
      this.obtener();
    }
  }

  // Método asíncrono para obtener los datos de las naves estelares.
  async obtener() {
    // Creamos una referencia al método 'getById' del servicio de naves estelares.
    const service = this.starshipService.getById.bind(this.starshipService);

    // Verificamos si la propiedad 'starships' tiene datos.
    if (this.starships) {
      // Llamamos al método 'getData' del servicio de herramientas para obtener los datos
      // de las naves estelares y los asignamos a 'starshipsData'.
      this.starshipsData = await this.toolService.getData(
        this.starships,
        service
      );
    }
  }

  // Método para ver los detalles de una nave estelar específica.
  seeStarship(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'starship'); // Redirigimos a la ubicación de la nave espacial
    }
  }
}
