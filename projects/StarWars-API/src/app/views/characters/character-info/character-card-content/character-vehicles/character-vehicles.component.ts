import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { VehiclesService } from '../../../../../services/vehicles.service';
import { ToolsService } from '../../../../../services/tools.service';
import { vehiclesResults } from '../../../../../models/vehicles';
import { character } from '../../../../../models/characters';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { CardContentComponent } from "../../../../layouts/card-content/card-content.component";

@Component({
  selector: 'app-character-vehicles',
  standalone: true,
  imports: [MatListModule, MatCardModule, SectionHeaderComponent, CardContentComponent],
  templateUrl: './character-vehicles.component.html',
  styleUrl: './character-vehicles.component.css',
})
export class CharacterVehiclesComponent implements OnChanges {
  @Input() characterInfo!: character;

  toolsService = inject(ToolsService);
  vehiclesService = inject(VehiclesService);
  vehiclesData: vehiclesResults[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterInfo']) {
      this.listVehicles();
    }
  }

  async listVehicles() {
    this.vehiclesData = [];
    this.characterInfo.vehicles.forEach(async (vehicle) => {
      let id = parseInt(this.toolsService.extractOfUrl(vehicle));
      let res = await this.vehiclesService.obtener(id);
      this.vehiclesData.push(res);
    });
  }
}
