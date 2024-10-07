import { Component, inject, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { character } from '../../../../../models/characters';
import { ToolsService } from '../../../../../services/tools.service';

@Component({
  selector: 'app-character-dates',
  standalone: true,
  imports: [MatListModule, MatCardModule],
  templateUrl: './character-dates.component.html',
  styleUrl: './character-dates.component.css',
})
export class CharacterDatesComponent implements OnInit {
  toolService = inject(ToolsService);
  @Input() characterInfo!: character;

  created = '';
  edited = '';

  ngOnInit(): void {
    this.formatDate();
  }

  formatDate() {
    const c = this.characterInfo.created;
    const e = this.characterInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
