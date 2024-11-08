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
  @Input() count!: number;
  @Input() idP!: number;
  @Input() name!: string;
  @Input() location!: string;

  private toolService = inject(ToolsService);

  @Output() fetchData = new EventEmitter<number>();

  actions: Button[] = [
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

  ids: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['count'] &&
      changes['count'].currentValue !== 0 &&
      changes['idP'] &&
      changes['idP'].currentValue !== 0
    ) {
      this.initComponent();
    }
  }

  ngOnInit(): void {
    this.initComponent();
  }

  private initComponent(): void {
    this.validation(this.idP);
    this.getIds();
  }

  first(): void {
    this.navigateToIndex(0);
  }

  prev(): void {
    const prevIndex = this.ids.findIndex((id) => id === this.idP) - 1;
    this.navigateToIndex(prevIndex);
  }
  next(): void {
    const nextIndex = this.ids.findIndex((id) => id === this.idP) + 1;
    this.navigateToIndex(nextIndex);
  }

  last(): void {
    this.navigateToIndex(this.ids.length - 1);
  }

  private navigateToIndex(index: number): void {
    const id = this.ids[index];
    if (id !== undefined) {
      this.fetchData.emit(id);
      this.validation(id);
    }
  }

  private validation(id: number): void {
    const lastPosition = this.ids.length - 1;
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

  private getIds(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const json = localStorage.getItem(`ids-${this.location}`);
      this.ids = json ? JSON.parse(json) : [];
    } else {
      console.error('localStorage is not available');
    }
  }
}
