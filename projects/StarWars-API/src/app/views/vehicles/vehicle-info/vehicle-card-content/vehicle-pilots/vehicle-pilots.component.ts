import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { vehiclesResults } from '../../../../../models/vehicles.model';
import { CharactersService } from '../../../../../services/characters.service';
import { ToolsService } from '../../../../../services/tools.service';
import { character } from '../../../../../models/characters.model';

@Component({
  selector: 'app-vehicle-pilots',
  standalone: true,
  imports: [SectionHeaderComponent, MatListModule, MatCardModule],
  templateUrl: './vehicle-pilots.component.html',
  styleUrl: './vehicle-pilots.component.css',
})
export class VehiclePilotsComponent implements OnChanges {
  @Input() vehicleInfo!: vehiclesResults;
  private characterService = inject(CharactersService);
  private toolService = inject(ToolsService);
  characterData: character[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicleInfo'] && changes['vehicleInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.vehicleInfo.pilots;
    const service = this.characterService.obtener.bind(this.characterService);
    if (data) {
      this.characterData = await this.toolService.getData(data, service);
    }
  }

  seeCharacter(url: string) {
    this.toolService.goLocation(url, 'character');
  }
}
