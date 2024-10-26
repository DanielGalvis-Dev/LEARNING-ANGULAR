import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters.model';
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';

@Component({
  selector: 'app-character-dates',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './character-dates.component.html',
  styleUrl: './character-dates.component.css',
})
export class CharacterDatesComponent implements OnChanges {
  toolService = inject(ToolsService);
  @Input() characterInfo!: character;

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.characterInfo.created;
    const e = this.characterInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
