import { Component, Input } from '@angular/core';
import { filmsResults } from '../../../../../models/films';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-film-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './film-basic-info.component.html',
  styleUrl: './film-basic-info.component.css',
})
export class FilmBasicInfoComponent {
  @Input() filmInfo!: filmsResults;
}
