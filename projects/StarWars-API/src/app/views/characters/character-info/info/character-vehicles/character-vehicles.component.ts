import { Component, inject, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../../../../services/vehicles.service';
import { ToolsService } from '../../../../../services/tools.service';
import { vehiclesResults } from '../../../../../models/vehicles';
import { firstValueFrom } from 'rxjs';
import { character } from '../../../../../models/characters';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-vehicles',
  standalone: true,
  imports: [MatListModule, MatCardModule],
  templateUrl: './character-vehicles.component.html',
  styleUrl: './character-vehicles.component.css',
})
export class CharacterVehiclesComponent implements OnInit {
  @Input() characterInfo!: character;

  toolsService = inject(ToolsService);
  vehiclesService = inject(VehiclesService);
  vehiclesData: vehiclesResults[] = [];

  ngOnInit(): void {
    this.listVehicles();
  }

  async listVehicles() {
    this.characterInfo.vehicles.forEach(async (vehicle) => {
      let id = parseInt(this.toolsService.extractOfUrl(vehicle));
      let res = await firstValueFrom(this.vehiclesService.obtener(id));
      this.vehiclesData.push(res);
    });
  }
}
