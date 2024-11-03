import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  // Maneja los cambios en los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['count'] &&
      changes['count'].currentValue !== 0 &&
      changes['idP'] &&
      changes['idP'].currentValue !== 0
    ) {
      this.validation(this.idP);
    }
  }

  // Navega al primer elemento
  first() {
    this.fetchData.emit(1);
    this.validation(1);
  }

  // Navega al elemento anterior
  prev() {
    if (this.idP > 0) {
      this.idP--;
      console.log(this.idP);
      this.fetchData.emit(this.idP);
      this.validation(this.idP);
    }
  }

  // Navega al siguiente elemento
  next() {
    if (this.idP < this.count) {
      this.idP++;
      console.log(this.idP);
      this.fetchData.emit(this.idP);
      this.validation(this.idP);
    }
  }

  // Navega al último elemento
  last() {
    this.fetchData.emit(this.count);
    this.validation(this.count);
  }

  // Valida las acciones disponibles según el ID actual
  validation(id: number) {
    const actionsToDisable =
      id === 1
        ? ['First', 'Previous']
        : id === this.count
        ? ['Last', 'Next']
        : [];
    this.actions.forEach((btnC) => {
      btnC.disabled = actionsToDisable.includes(btnC.action);
    });
  }
}
