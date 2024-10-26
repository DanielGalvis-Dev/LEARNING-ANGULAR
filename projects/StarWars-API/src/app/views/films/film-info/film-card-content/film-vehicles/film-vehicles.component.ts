import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films.model';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { ToolsService } from '../../../../../services/tools.service';
import { VehiclesService } from '../../../../../services/vehicles.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { vehiclesResults } from '../../../../../models/vehicles.model';

@Component({
  selector: 'app-film-vehicles',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './film-vehicles.component.html',
  styleUrl: './film-vehicles.component.css',
})
export class FilmVehiclesComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  toolService = inject(ToolsService);
  vehicleService = inject(VehiclesService);
  vehicleData: vehiclesResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.filmInfo.vehicles;
    const service = this.vehicleService.obtener.bind(this.vehicleService);
    if (data) {
      this.vehicleData = await this.toolService.getData(data, service);
    }
  }

  seeVehicle(url: string) {
    this.toolService.goLocation(url, 'vehicle');
  }
}
