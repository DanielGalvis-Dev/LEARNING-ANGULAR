import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { speciesRes } from '../../../models/species.model';
import { SpeciesService } from '../../../services/species.service';
import { ToolsService } from '../../../services/tools.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-species-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './species-section.component.html',
  styleUrl: './species-section.component.css',
})
export class SpeciesSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('species') species!: string[];
  @Input('title') title: string = 'SPECIES';
  @Input('icon') icon: string = 'groups';

  // Servicios
  toolService = inject(ToolsService);
  specieService = inject(SpeciesService);

  // Arreglo que almacenará los datos de las especies
  speciesData: speciesRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si ha habido un cambio en la propiedad 'species' y si tiene un valor actual
    if (changes['species'] && changes['species'].currentValue) {
      // Llama al método para obtener los datos de las especies
      this.obtener();
    }
  }

  // Método asíncrono para obtener los datos de las especies
  async obtener() {
    // Se vincula el método 'getOne' del servicio de especies al contexto actual
    const service = this.specieService.getOne.bind(this.specieService);

    // Verifica si hay especies definidas
    if (this.species) {
      // Obtiene los datos de las especies utilizando el servicio de herramientas
      this.speciesData = await this.toolService.getData(this.species, service);
    }
  }

  // Método para ver una especie específica, redirige a la URL proporcionada
  seeSpecie(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'specie'); // Redirigimos a la ubicación de la especie
    }
  }
}
