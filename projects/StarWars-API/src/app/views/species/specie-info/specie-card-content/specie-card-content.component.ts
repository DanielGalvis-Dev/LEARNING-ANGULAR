import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SpecieCharactersComponent } from './specie-characters/specie-characters.component';
import { SpecieBasicInfoComponent } from './specie-basic-info/specie-basic-info.component';
import { SpecieFilmsComponent } from './specie-films/specie-films.component';
import { SpecieDatesComponent } from './specie-dates/specie-dates.component';
import { speciesResults } from '../../../../models/species.model';

@Component({
  selector: 'app-specie-card-content',
  standalone: true,
  imports: [
    MatListModule,
    SpecieCharactersComponent,
    SpecieBasicInfoComponent,
    SpecieFilmsComponent,
    SpecieDatesComponent,
  ],
  templateUrl: './specie-card-content.component.html',
  styleUrl: './specie-card-content.component.css',
})
export class SpecieCardContentComponent {
  @Input() specieInfo!: speciesResults;
}
