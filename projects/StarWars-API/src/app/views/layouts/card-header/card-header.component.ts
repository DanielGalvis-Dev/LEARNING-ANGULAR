import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface buttons {
  action: string;
  icon: string;
  event: () => void;
  class: string;
  position: string;
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
  // Parametros
  @Input('count') count!: number;
  @Input('idP') idP!: number;
  @Input('name') name!: string;
  @Output() fetchData = new EventEmitter<number>();

  // Constructor
  constructor(private router: Router) {}

  //
  actions: buttons[] = [
    {
      action: 'First',
      icon: 'first_page',
      event: this.first.bind(this),
      class: 'first-button',
      position: 'above',
      disabled: false,
    },
    {
      action: 'Previous',
      icon: 'navigate_before',
      event: this.prev.bind(this),
      class: 'prev-button',
      position: 'above',
      disabled: false,
    },
    {
      action: 'Next',
      icon: 'navigate_next',
      event: this.next.bind(this),
      class: 'next-button',
      position: 'above',
      disabled: false,
    },
    {
      action: 'Last',
      icon: 'last_page',
      event: this.last.bind(this),
      class: 'last-button',
      position: 'above',
      disabled: false,
    },
  ];

  //
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

  first() {
    this.fetchData.emit(1);
    this.validation(1);
  }

  // Ver el resultado anterior
  prev() {
    if (this.idP > 0) {
      this.idP--;
      this.fetchData.emit(this.idP);
      this.validation(this.idP);
    }
  }

  //  Ver el resuldato siguiente
  next() {
    if (this.idP < this.count) {
      this.idP++;
      this.fetchData.emit(this.idP);
      this.validation(this.idP);
    }
  }

  last() {
    this.fetchData.emit(this.count);
    this.validation(this.count);
  }

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
