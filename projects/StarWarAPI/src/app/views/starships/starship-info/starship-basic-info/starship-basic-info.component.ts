import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/headers/section-header/section-header.component';
import { starshipsRes } from '../../../../models/starships.model';

@Component({
  selector: 'app-starship-basic-info',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './starship-basic-info.component.html',
  styleUrl: './starship-basic-info.component.css',
})
export class StarshipBasicInfoComponent {
  @Input() starshipInfo!: starshipsRes;
}
