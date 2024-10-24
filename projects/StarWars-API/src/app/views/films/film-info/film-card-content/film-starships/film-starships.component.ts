import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { ToolsService } from '../../../../../services/tools.service';
import { StarshipsService } from '../../../../../services/starships.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-film-starships',
  standalone: true,
  imports: [SectionHeaderComponent, MatCardModule, MatListModule],
  templateUrl: './film-starships.component.html',
  styleUrl: './film-starships.component.css',
})
export class FilmStarshipsComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  toolService = inject(ToolsService);
  starshipService = inject(StarshipsService);
  starshipNames: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.filmInfo.starships;
    const service = this.starshipService.obtener.bind(this.starshipService);
    if (data) {
      this.starshipNames = (await this.toolService.getData(data, service)).map(
        (data) => data.name
      );
    }
  }
}
