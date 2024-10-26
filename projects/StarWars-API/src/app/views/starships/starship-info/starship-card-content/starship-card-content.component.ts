import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { starshipsResults } from '../../../../models/starships.model';
import { StarshipBasicInfoComponent } from "./starship-basic-info/starship-basic-info.component";
import { StarshipPilotsComponent } from "./starship-pilots/starship-pilots.component";
import { StarshipFilmsComponent } from "./starship-films/starship-films.component";
import { StarshipDatesComponent } from "./starship-dates/starship-dates.component";

@Component({
  selector: 'app-starship-card-content',
  standalone: true,
  imports: [MatListModule, StarshipBasicInfoComponent, StarshipPilotsComponent, StarshipFilmsComponent, StarshipDatesComponent],
  templateUrl: './starship-card-content.component.html',
  styleUrl: './starship-card-content.component.css',
})
export class StarshipCardContentComponent {
  @Input() starshipInfo!: starshipsResults;
}
