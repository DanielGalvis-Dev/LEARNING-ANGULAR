import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToolsService } from '../../../../../services/tools.service';
import { vehiclesResults } from '../../../../../models/vehicles.model';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-vehicle-dates',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './vehicle-dates.component.html',
  styleUrl: './vehicle-dates.component.css',
})
export class VehicleDatesComponent implements OnChanges {
  @Input() vehicleInfo!: vehiclesResults;
  toolService = inject(ToolsService);

  created = '';
  edited = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicleInfo']) {
      this.formatDate();
    }
  }

  formatDate() {
    const c = this.vehicleInfo.created;
    const e = this.vehicleInfo.edited;
    this.created = this.toolService.formatDate(c);
    this.edited = this.toolService.formatDate(e);
  }
}
