import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToolsService } from '../../../services/tools.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SectionHeaderComponent } from '../../headers/section-header/section-header.component';

@Component({
  selector: 'app-dates-section',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './dates-section.component.html',
  styleUrl: './dates-section.component.css',
})
export class DatesSectionComponent implements OnChanges {
  // Variables de entrada
  @Input('created') created!: string;
  @Input('edited') edited!: string;
  @Input('title') title: string = 'DATES';
  @Input('icon') icon: string = 'calendar_month';

  // Inyección del servicio de herramientas
  toolService = inject(ToolsService);

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si las propiedades 'created' y 'edited' han cambiado
    if (changes['created'] && changes['edited']) {
      // Si han cambiado, llama al método para formatear las fechas
      this.formatDate();
    }
  }

  // Método para formatear las fechas de creación y edición
  formatDate() {
    // Formatea la fecha de creación utilizando el servicio de herramientas
    this.created = this.toolService.formatDate(this.created);

    // Formatea la fecha de edición utilizando el servicio de herramientas
    this.edited = this.toolService.formatDate(this.edited);
  }
}
