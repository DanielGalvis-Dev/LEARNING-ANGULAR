import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ToolsService } from '../../services/tools.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  // Variables de entrada que reciben datos desde el componente padre
  @Input('data') data!: any[]; // Datos que se mostrarán en la tabla
  @Input('location') location!: string; // Ubicación del recurso (ej. 'film', 'people', etc.)
  @Input('icon') icon!: string; // Icono que se puede utilizar en la tabla
  @Input('nextPage') nextPage!: string | null; // URL para la siguiente página de datos
  @Input('prevPage') prevPage!: string | null; // URL para la página anterior de datos

  // Eventos de salida que el componente padre puede escuchar
  @Output() fetchData = new EventEmitter<string>(); // Emite cuando se necesita cargar más datos
  @Output() getByName = new EventEmitter<string>(); // Emite cuando se necesita filtrar por nombre

  // Servicio de herramientas inyectado para realizar operaciones auxiliares
  private toolService = inject(ToolsService);

  // Variables de la tabla
  displayedColumns: string[] = ['id', 'name', 'action']; // Columnas que se mostrarán en la tabla
  pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página
  hidePageSize: boolean = false; // Controla la visibilidad del selector de tamaño de página

  @ViewChild(MatSort) sort!: MatSort; // Referencia al MatSort para habilitar la ordenación

  // Método que se llama cuando cambian las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si hay cambios en los datos
    if (changes['data'] && changes['data'].currentValue) {
      if (this.data.length > 0) {
        this.validation(); // Valida la ubicación para ajustar el comportamiento de la tabla
      }
    }

    // Log de la página anterior si ha cambiado
    if (changes['prevPage'] && changes['prevPage'].currentValue) {
      console.log(this.prevPage);
    }

    // Log de la siguiente página si ha cambiado
    if (changes['nextPage'] && changes['nextPage'].currentValue) {
      console.log(this.nextPage);
    }
  }

  // Método para aplicar un filtro basado en el valor ingresado en un campo de texto
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Obtiene el valor del input
    const name: string = filterValue.trim().toLowerCase(); // Normaliza el valor para el filtrado
    if (name.length > 0) {
      console.log(name); // Muestra el nombre filtrado en la consola
      this.getByName.emit(name); // Emite el nombre para filtrar los datos
    } else {
      this.fetchData.emit(); // Si no hay filtro, emite para cargar todos los datos
    }
  }

  // Método de validación para ajustar la visibilidad del selector de tamaño de página
  validation() {
    if (this.location === 'film') {
      this.hidePageSize = true; // Oculta el selector si la ubicación es 'film'
    } else {
      this.hidePageSize = false; // Muestra el selector para otras ubicaciones
    }
  }

  // Método para convertir una URL en un ID numérico
  convertUrlToId(url: string) {
    const id = parseInt(this.toolService.extractOfUrl(url)); // Extrae y convierte el ID de la URL
    return id; // Devuelve el ID
  }

  // Método para ver información detallada de un elemento
  seeElemet(url: string) {
    if (url) {
      this.toolService.goLocation(url, this.location); // Redirige a la ubicación del elemento
    }
  }

  // Método para navegar a la siguiente página de datos
  seeNextPage() {
    this.navigateToPage(this.nextPage); // Llama al método de navegación con la URL de la siguiente página
  }

  // Método para navegar a la página anterior de datos
  seePrevPage() {
    this.navigateToPage(this.prevPage); // Llama al método de navegación con la URL de la página anterior
  }

  // Método para navegar a una página específica
  navigateToPage(page: string | null) {
    if (page && page !== null) {
      const newPage: string = this.toolService.extractOfUrl(page); // Extrae la nueva página de la URL
      this.fetchData.emit(newPage); // Emite la nueva página para cargar los datos
    }
  }
}
