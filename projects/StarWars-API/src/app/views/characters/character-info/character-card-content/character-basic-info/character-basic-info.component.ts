import { Component, Input } from '@angular/core';
import { character } from '../../../../../models/characters.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';

@Component({
  selector: 'app-character-basic-info',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    SectionHeaderComponent,
  ],
  templateUrl: './character-basic-info.component.html',
  styleUrl: './character-basic-info.component.css',
})
export class CharacterBasicInfoComponent {
  @Input() characterInfo!: character;
}
