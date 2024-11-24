import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Button {
  action: string;
  icon: string;
  event: () => void;
  class: string;
  disabled: boolean;
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css',
})
export class CardHeaderComponent implements OnChanges, OnInit {
  // Propiedades de entrada que se recibirán del componente padre
  @Input() count!: number; // Número total de elementos
  @Input() idP!: number; // ID del elemento actual
  @Input() name!: string; // Nombre del elemento
  @Input() location!: string; // Ubicación para almacenar y recuperar IDs

  // Evento de salida que se emite para solicitar datos
  @Output() fetchData = new EventEmitter<number>();

  // Definición de los botones de acción disponibles en el componente
  actions: Button[] = [
    {
      action: 'First',
      icon: 'first_page',
      event: this.first.bind(this), // Método para ir al primer elemento
      class: 'first-button',
      disabled: false,
    },
    {
      action: 'Previous',
      icon: 'navigate_before',
      event: this.prev.bind(this), // Método para ir al elemento anterior
      class: 'prev-button',
      disabled: false,
    },
    {
      action: 'Next',
      icon: 'navigate_next',
      event: this.next.bind(this), // Método para ir al siguiente elemento
      class: 'next-button',
      disabled: false,
    },
    {
      action: 'Last',
      icon: 'last_page',
      event: this.last.bind(this), // Método para ir al último elemento
      class: 'last-button',
      disabled: false,
    },
  ];

  // Arreglo para almacenar los IDs de los elementos
  ids: number[] = [];

  // Método que se llama cuando hay cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si 'count' y 'idP' han cambiado y son diferentes de cero
    if (
      changes['count'] &&
      changes['count'].currentValue !== 0 &&
      changes['idP'] &&
      changes['idP'].currentValue !== 0
    ) {
      this.initComponent(); // Inicializa el componente si las condiciones se cumplen
    }
  }

  // Método que se llama una vez al inicializar el componente
  ngOnInit(): void {
    this.initComponent(); // Inicializa el componente
  }

  // Método privado para inicializar el componente
  private initComponent(): void {
    this.validation(this.idP); // Valida el ID actual
    this.getIds(); // Obtiene los IDs almacenados
  }

  // Método para navegar al primer elemento
  first(): void {
    this.navigateToIndex(0); // Navega al índice 0
  }

  // Método para navegar al elemento anterior
  prev(): void {
    const prevIndex = this.ids.findIndex((id) => id === this.idP) - 1; // Encuentra el índice anterior
    this.navigateToIndex(prevIndex); // Navega al índice anterior
  }

  // Método para navegar al siguiente elemento
  next(): void {
    const nextIndex = this.ids.findIndex((id) => id === this.idP) + 1; // Encuentra el índice siguiente
    this.navigateToIndex(nextIndex); // Navega al índice siguiente
  }

  // Método para navegar al último elemento
  last(): void {
    this.navigateToIndex(this.ids.length - 1); // Navega al último índice
  }

  // Método privado para navegar a un índice específico
  private navigateToIndex(index: number): void {
    const id = this.ids[index]; // Obtiene el ID en el índice especificado
    if (id !== undefined) {
      this.fetchData.emit(id); // Emite el ID para solicitar datos
      this.validation(id); // Valida el ID
    }
  }

  // Método privado para validar el ID actual y habilitar/deshabilitar acciones
  private validation(id: number): void {
    const lastPosition = this.ids.length - 1; // Última posición en el arreglo de IDs
    const actionsToDisable =
      id === this.ids[0] // Si es el primer ID
        ? ['First', 'Previous'] // Deshabilita los botones de "First" y "Previous"
        : id === this.ids[lastPosition] // Si es el último ID
        ? ['Last', 'Next'] // Deshabilita los botones de "Last" y "Next"
        : []; // Si no es ni el primero ni el último, no deshabilitar acciones

    // Deshabilita las acciones correspondientes
    this.actions.forEach((btnC) => {
      btnC.disabled = actionsToDisable.includes(btnC.action);
    });
  }

  // Método privado para obtener los IDs almacenados en localStorage
  private getIds(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const json = localStorage.getItem(`ids-${this.location}`); // Obtiene los IDs del localStorage
      this.ids = json ? JSON.parse(json) : []; // Parsea los IDs o inicializa como un arreglo vacío
    } else {
      console.error('localStorage is not available'); // Manejo de error si localStorage no está disponible
    }
  }
}
