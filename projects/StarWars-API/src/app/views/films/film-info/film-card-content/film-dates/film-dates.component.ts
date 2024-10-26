import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films.model';
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-film-dates',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './film-dates.component.html',
  styleUrl: './film-dates.component.css',
})
export class FilmDatesComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  toolService = inject(ToolsService);

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.filmInfo.created;
    const e = this.filmInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
