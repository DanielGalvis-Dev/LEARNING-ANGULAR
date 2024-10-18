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

interface MyCallback {
  (data: any): void;
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
  hiddenNext = false;
  hiddenPrev = false;

  //
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['count'] && changes['count'].currentValue !== 0) {
      this.count;
      // this.validation();
    }
  }

  first() {
    this.fetchData.emit(1);
  }

  // Ver el resultado anterior
  prev() {
    if (this.idP > 0) {
      this.idP--;
      this.fetchData.emit(this.idP);
    }
    this.validation();
  }

  //  Ver el resuldato siguiente
  next() {
    if (this.idP < this.count) {
      this.idP++;
      this.fetchData.emit(this.idP);
    }
    this.validation();
  }

  last() {
    this.fetchData.emit(this.count);
  }

  validation() {
    this.actions.forEach((button) => {
      const id = this.idP;
      const count = this.count;
      let hidden = button.hidden;
      const action = button.action;

      //
      hidden = id === 1 && action === 'Previous' ? true : false;

      //
      hidden = id === count && action === 'Next' ? true : false;

      //
      hidden = id === count && action === 'First' ? true : false;

      //
      hidden = id === count && action === 'Last' ? true : false;
    });
  }

  actions = [
    {
      action: 'First',
      icon: 'first_page',
      event: this.first.bind(this),
      class: 'firs-button',
      position: 'above',
      hidden: false,
    },
    {
      action: 'Previous',
      icon: 'arrow_back',
      event: this.prev.bind(this),
      class: 'prev-button',
      position: 'above',
      hidden: false,
    },
    {
      action: 'Next',
      icon: 'arrow_forward',
      event: this.next.bind(this),
      class: 'next-button',
      position: 'above',
      hidden: false,
    },
    {
      action: 'Last',
      icon: 'last_page',
      event: this.last.bind(this),
      class: 'last-button',
      position: 'above',
      hidden: false,
    },
  ];
}
