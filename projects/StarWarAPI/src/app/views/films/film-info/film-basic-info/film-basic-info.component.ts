import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';
import { filmsRes } from '../../../../models/films.model';

@Component({
  selector: 'app-film-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './film-basic-info.component.html',
  styleUrl: './film-basic-info.component.css',
})
export class FilmBasicInfoComponent {
  @Input() filmInfo!: filmsRes;
}
