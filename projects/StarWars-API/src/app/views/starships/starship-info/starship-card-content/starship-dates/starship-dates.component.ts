import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { starshipsResults } from '../../../../../models/starships.model';
import { ToolsService } from '../../../../../services/tools.service';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-starship-dates',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './starship-dates.component.html',
  styleUrl: './starship-dates.component.css',
})
export class StarshipDatesComponent implements OnChanges {
  @Input() starshipInfo!: starshipsResults;
  toolService = inject(ToolsService);

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['starshipInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.starshipInfo.created;
    const e = this.starshipInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
