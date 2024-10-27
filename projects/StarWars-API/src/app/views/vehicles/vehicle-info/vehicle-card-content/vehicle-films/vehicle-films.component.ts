import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { vehiclesResults } from '../../../../../models/vehicles.model';
import { FilmsService } from '../../../../../services/films.service';
import { ToolsService } from '../../../../../services/tools.service';
import { filmsResults } from '../../../../../models/films.model';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-vehicle-films',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './vehicle-films.component.html',
  styleUrl: './vehicle-films.component.css',
})
export class VehicleFilmsComponent implements OnChanges {
  @Input() vehicleInfo!: vehiclesResults;
  private filmService = inject(FilmsService);
  private toolService = inject(ToolsService);
  filmsData: filmsResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicleInfo'] && changes['vehicleInfo'].currentValue) {
      this.getFilms();
    }
  }

  async getFilms() {
    const data = this.vehicleInfo.films;
    const service = this.filmService.obtener.bind(this.filmService);
    if (data) {
      this.filmsData = await this.toolService.getData(data, service);
    }
  }

  seeFilm(url: string) {
    this.toolService.goLocation(url, 'film');
  }
}
