import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { planetsResults } from '../../../../../models/planets';
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-planet-dates',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './planet-dates.component.html',
  styleUrl: './planet-dates.component.css',
})
export class PlanetDatesComponent implements OnChanges {
  @Input() planetInfo!: planetsResults;
  toolService = inject(ToolsService);

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planetInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.planetInfo.created;
    const e = this.planetInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
