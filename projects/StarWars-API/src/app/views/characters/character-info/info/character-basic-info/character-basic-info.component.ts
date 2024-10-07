import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters';

@Component({
  selector: 'app-character-basic-info',
  standalone: true,
  imports: [MatListModule, MatCardModule],
  templateUrl: './character-basic-info.component.html',
  styleUrl: './character-basic-info.component.css',
})
export class CharacterBasicInfoComponent {
  @Input() characterInfo!: character;
}
