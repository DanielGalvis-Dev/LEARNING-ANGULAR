import { Component, Input } from '@angular/core';
import { character } from '../../../models/characters.model';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.css',
})
export class CardContentComponent {
  // @Input() characterInfo!: character;
}
