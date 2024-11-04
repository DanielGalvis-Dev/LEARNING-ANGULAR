import {
  Component,
  EventEmitter,
  inject,
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
import { ToolsService } from '../../../services/tools.service';

interface buttons {
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
export class CardHeaderComponent implements OnChanges {
  // Parámetros de entrada
  @Input('count') count!: number; // Cantidad total de elementos
  @Input('idP') idP!: number; // Identificador del elemento actual
  @Input('name') name!: string; // Nombre del elemento actual
  // @Input('section') section!: string; // Array de id de los elementos

  // Servicio de herramientas
  toolservice = inject(ToolsService);

  // Evento de salida
  @Output() fetchData = new EventEmitter<number>();

  // Definición de acciones disponibles en el componente
  actions: buttons[] = [
    {
      action: 'First',
      icon: 'first_page',
      event: this.first.bind(this),
      class: 'first-button',
      disabled: false,
    },
    {
      action: 'Previous',
      icon: 'navigate_before',
      event: this.prev.bind(this),
      class: 'prev-button',
      disabled: false,
    },
    {
      action: 'Next',
      icon: 'navigate_next',
      event: this.next.bind(this),
      class: 'next-button',
      disabled: false,
    },
    {
      action: 'Last',
      icon: 'last_page',
      event: this.last.bind(this),
      class: 'last-button',
      disabled: false,
    },
  ];

  // Array de id de los elementos
  ids: number[] = [];

  // Maneja los cambios en los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['count'] &&
      changes['count'].currentValue !== 0 &&
      changes['idP'] &&
      changes['idP'].currentValue !== 0
    ) {
      // console.log(this.idP);
      this.validation(this.idP);
      this.getIds();
    }
  }

  //
  // ngOnInit(): void {
    // this.getIds();
  // }

  // Navega al primer elemento
  first() {
    this.fetchData.emit(this.ids[0]);
    this.validation(this.ids[0]);
  }

  // Navega al elemento anterior
  prev() {
    if (this.idP > 0) {
      // console.log(`idP: ${this.idP}`);
      for (let i = this.idP - 1; this.ids[0] < this.ids[i]; i--) {
        if (this.ids.includes(i)) {
          // console.log(`i: ${i}`);
          this.fetchData.emit(i);
          this.validation(i);
          break;
        }
      }
    }
  }

  // Navega al siguiente elemento
  next() {
    const lastPosition = this.ids.length - 1;
    if (this.ids[this.idP - 1] < this.ids[lastPosition]) {
      // console.log(`idP: ${this.idP}`);
      for (let i = this.idP + 1; i < this.ids.length + 1; i++) {
        if (this.ids.includes(i)) {
          // console.log(`i: ${i}`);
          this.fetchData.emit(i);
          this.validation(i);
          break;
        }
      }
    }
  }

  // Navega al último elemento
  last() {
    const lastPosition = this.ids.length - 1;
    this.fetchData.emit(this.ids[lastPosition]);
    this.validation(this.ids[lastPosition]);
  }

  // Valida las acciones disponibles según el ID actual
  validation(id: number) {
    // console.log(`Parametro id: ${id}`);
    // console.log(`primer id de la lista: ${this.ids[0]}`);
    const lastPosition = this.ids.length - 1;
    if (id !== 0) {
      const actionsToDisable =
        id === this.ids[0]
          ? ['First', 'Previous']
          : id === this.ids[lastPosition]
          ? ['Last', 'Next']
          : [];
      this.actions.forEach((btnC) => {
        btnC.disabled = actionsToDisable.includes(btnC.action);
      });
    }
  }

  getIds() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedIds = localStorage.getItem('ids');
      if (storedIds) {
        try {
          const newIds: number[] = JSON.parse(storedIds);
          this.ids = newIds;
          // console.log(this.ids);
        } catch (error) {
          console.error('Error parsing JSON from localStorage:', error);
        }
      } else {
        console.log('No IDs found in localStorage');
      }
    } else {
      console.error('localStorage is not available');
    }
  }
}
