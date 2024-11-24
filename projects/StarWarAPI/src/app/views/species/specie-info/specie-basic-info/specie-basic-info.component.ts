import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';
import { speciesRes } from '../../../../models/species.model';
import { PlanetsService } from '../../../../services/planets.service';
import { ToolsService } from '../../../../services/tools.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-specie-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule, NgClass],
  templateUrl: './specie-basic-info.component.html',
  styleUrl: './specie-basic-info.component.css',
})
export class SpecieBasicInfoComponent implements OnChanges {
  // Importamos las dependencias necesarias y decoradores
  @Input() specieInfo!: speciesRes; // Se recibe información sobre la especie como una entrada
  private toolService = inject(ToolsService); // Inyectamos el servicio de herramientas
  private planetService = inject(PlanetsService); // Inyectamos el servicio de planetas

  // Variables
  homeworld: string = ''; // Variable para almacenar el nombre del hogar de la especie

  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos si ha cambiado la información de la especie y si tiene un valor actual
    if (changes['specieInfo'] && changes['specieInfo'].currentValue) {
      this.getPlanet(); // Llamamos al método para obtener información del planeta
    }
  }

  // Método asíncrono para obtener el planeta de la especie
  async getPlanet() {
    // Verificamos que la información de la especie esté disponible
    if (this.specieInfo && this.specieInfo.homeworld) {
      const planet = this.specieInfo.homeworld.toString(); // Obtenemos la URL del hogar de la especie
      // Verificamos que la URL del planeta no esté vacía
      if (planet.length > 0) {
        const id = parseInt(this.toolService.extractOfUrl(planet)); // Extraemos el ID del planeta de la URL
        // Llamamos al servicio de planetas para obtener el nombre del planeta usando el ID
        this.homeworld = (await this.planetService.getById(id)).name;
      } else {
        this.homeworld = 'Unknown'; // Si no hay URL, asignamos 'Desconocido'
      }
    }
  }

  // Método para ver detalles del planeta a partir de su URL
  seePlanet(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'planet'); // Redirigimos a la ubicación del planeta
    }
  }
}
