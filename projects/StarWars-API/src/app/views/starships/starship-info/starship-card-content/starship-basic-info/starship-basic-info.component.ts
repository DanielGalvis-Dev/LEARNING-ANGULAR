import { Component, Input } from '@angular/core';
import { starshipsResults } from '../../../../../models/starships.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from "../../../../layouts/section-header/section-header.component";

@Component({
  selector: 'app-starship-basic-info',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent],
  templateUrl: './starship-basic-info.component.html',
  styleUrl: './starship-basic-info.component.css',
})
export class StarshipBasicInfoComponent {
  @Input() starshipInfo!: starshipsResults;
}
