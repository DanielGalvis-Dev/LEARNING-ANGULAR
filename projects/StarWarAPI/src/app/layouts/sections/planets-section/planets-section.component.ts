import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { planetsRes } from '../../../models/planets.model';
import { PlanetsService } from '../../../services/planets.service';
import { ToolsService } from '../../../services/tools.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-planets-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './planets-section.component.html',
  styleUrl: './planets-section.component.css',
})
export class PlanetsSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('planets') planets!: string[]; // Lista de planetas que se recibirán como entrada
  @Input('title') title: string = 'PLANETS'; // Título por defecto del componente
  @Input('icon') icon: string = 'public'; // Icono por defecto del componente

  // Inyección de servicios necesarios
  toolService = inject(ToolsService); // Servicio para herramientas
  planetService = inject(PlanetsService); // Servicio para planetas

  // Array para almacenar los datos de los planetas
  planetData: planetsRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hay cambios en la propiedad 'planets' y si tiene un valor actual
    if (changes['planets'] && changes['planets'].currentValue) {
      this.obtener(); // Llama al método obtener para cargar los datos de los planetas
    }
  }

  // Método asíncrono para obtener los datos de los planetas
  async obtener() {
    // Se vincula el método 'getById' del servicio de planetas
    const service = this.planetService.getById.bind(this.planetService);

    // Verifica si hay planetas disponibles
    if (this.planets) {
      // Llama al servicio de herramientas para obtener los datos de los planetas
      this.planetData = await this.toolService.getData(this.planets, service);
    }
  }

  // Método para ver un planeta específico
  seePlanet(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'planet'); // Redirigimos a la ubicación del planeta
    }
  }
}
