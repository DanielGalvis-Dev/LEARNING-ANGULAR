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

  vehiclesService = inject(VehiclesService);
  toolsService = inject(ToolsService);
  vehiclesData: vehiclesResults[] = [];
  vehiclesCount = 0;
  nextPage: string = '';

  ngOnInit(): void {
    this.listVehicles();
  }

  async listVehicles() {
    const data = await firstValueFrom(this.vehiclesService.listar());
    this.vehiclesCount = data.count;
    const count = this.toolsService.readonly(this.vehiclesCount);
    for (let i = 0; i < count; i++) {
      const data = await firstValueFrom(
        this.vehiclesService.listar(this.nextPage)
      );
      this.vehiclesData = this.vehiclesData.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }
  }
}
