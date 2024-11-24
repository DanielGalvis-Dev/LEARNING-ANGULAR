import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { peoplesRes } from '../../../models/peoples.model';
import { PeoplesService } from '../../../services/peoples.service';
import { ToolsService } from '../../../services/tools.service';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-peoples-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './peoples-section.component.html',
  styleUrl: './peoples-section.component.css',
})
export class PeoplesSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('peoples') peoples!: string[];
  @Input('title') title: string = 'PEOPLES';
  @Input('icon') icon: string = 'person';

  // Servicios
  private peopleService = inject(PeoplesService);
  private toolService = inject(ToolsService);

  // Inicializa un array para almacenar los datos de las personas
  peopleData: peoplesRes[] = [];

  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hay cambios en la propiedad 'peoples' y si su valor actual es válido
    if (changes['peoples'] && changes['peoples'].currentValue) {
      // Llama al método 'obtener' para obtener los datos
      this.obtener();
    }
  }

  // Método asíncrono para obtener datos de las personas
  async obtener() {
    // Se vincula el método 'getById' del servicio de personas al contexto actual
    const service = this.peopleService.getById.bind(this.peopleService);

    // Verifica si hay elementos en el array 'peoples'
    if (this.peoples.length > 0) {
      // Llama al servicio para obtener los datos de las personas y los almacena en 'peopleData'
      this.peopleData = await this.toolService.getData(this.peoples, service);
    }
  }

  // Método para ver los detalles de una persona, redirigiendo a una URL específica
  seePeople(url: string) {
    if (url) {
      this.toolService.goLocation(url, 'people'); // Redirigimos a la ubicación del personaje
    }
  }
}
