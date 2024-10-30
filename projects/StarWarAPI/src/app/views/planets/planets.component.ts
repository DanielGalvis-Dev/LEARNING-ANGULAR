import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { PlanetsService } from '../../services/planets.service';
import { planetsRes } from '../../models/planets.model';
import { TableComponent } from "../../layouts/table/table.component";

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
})
export class PlanetsComponent implements OnInit {
  private toolService = inject(ToolsService);
  private planetService = inject(PlanetsService);

  // Parametros
  data: planetsRes[] = [];
  icon = 'public';
  location = 'planet';

  ngOnInit(): void {
    this.list();
  }

  async list() {
    const service = this.planetService.getAll.bind(this.planetService);
    const count = (await this.planetService.getAll()).count;
    this.data = await this.toolService.allData(service, count);
  }
}
