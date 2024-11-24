import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PlanetsService } from '../../../../services/planets.service';
import { SpeciesService } from '../../../../services/species.service';
import { ToolsService } from '../../../../services/tools.service';
import { peoplesRes } from '../../../../models/peoples.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';

@Component({
  selector: 'app-people-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule, NgClass],
  templateUrl: './people-basic-info.component.html',
  styleUrl: './people-basic-info.component.css',
})
export class PeopleBasicInfoComponent implements OnChanges {
  // Importa las dependencias necesarias y define el componente
  @Input() peopleInfo!: peoplesRes; // Propiedad de entrada que recibe información sobre una persona
  private planetService = inject(PlanetsService); // Inyecta el servicio de planetas
  private specieService = inject(SpeciesService); // Inyecta el servicio de especies
  private toolService = inject(ToolsService); // Inyecta el servicio de herramientas

  homeworld!: string; // Variable para almacenar el nombre del mundo natal
  specie!: string; // Variable para almacenar el nombre de la especie

  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si 'peopleInfo' ha cambiado y su valor actual no es 0
    if (changes['peopleInfo'] && changes['peopleInfo'].currentValue !== 0) {
      this.obtener(); // Llama al método obtener para cargar la información
    }
  }

  // Método asincrónico para obtener información del planeta y la especie
  async obtener() {
    // Verifica si hay información de la persona
    if (this.peopleInfo) {
      // Obtiene el mundo natal de la persona
      const planet: string = this.peopleInfo.homeworld.toString(); // Convierte el mundo natal a cadena
      if (planet.length > 0) {
        // Si el mundo natal tiene longitud
        const id = parseInt(this.toolService.extractOfUrl(planet)); // Extrae el ID del URL del mundo natal
        this.homeworld = (await this.planetService.getById(id)).name; // Obtiene el nombre del planeta usando el servicio
      } else {
        this.homeworld = 'Unknown'; // Si no hay mundo natal, establece el valor como 'Desconocido'
      }

      // Obtiene la especie de la persona
      const specie: string = this.peopleInfo.species.toString(); // Convierte la especie a cadena
      if (specie.length > 0) {
        // Si la especie tiene longitud
        const id = parseInt(this.toolService.extractOfUrl(specie)); // Extrae el ID del URL de la especie
        this.specie = (await this.specieService.getById(id)).name; // Obtiene el nombre de la especie usando el servicio
      } else {
        this.specie = 'Unknown'; // Si no hay especie, establece el valor como 'Desconocido'
      }
    }
  }

  // Método para redirigir a la página del planeta
  seePlanet(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'planet'); // Redirigimos a la ubicación del planeta
    }
  }

  // Método para redirigir a la página de la especie
  seeSpecie(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'specie'); // Redirigimos a la ubicación de la especie
    }
  }
}
