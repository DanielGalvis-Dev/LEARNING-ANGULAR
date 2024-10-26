import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { speciesResults } from '../../../../../models/species.model';
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-specie-dates',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './specie-dates.component.html',
  styleUrl: './specie-dates.component.css',
})
export class SpecieDatesComponent implements OnChanges {
  @Input() specieInfo!: speciesResults;
  toolService = inject(ToolsService);

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specieInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.specieInfo.created;
    const e = this.specieInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
