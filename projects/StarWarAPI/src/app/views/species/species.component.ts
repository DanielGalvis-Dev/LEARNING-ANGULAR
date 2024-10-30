import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { SpeciesService } from '../../services/species.service';
import { speciesRes } from '../../models/species.model';
import { TableComponent } from "../../layouts/table/table.component";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
})
export class SpeciesComponent implements OnInit {
  private toolService = inject(ToolsService);
  private specieService = inject(SpeciesService);

  // Parametros
  data: speciesRes[] = [];
  icon = 'groups';
  location = 'specie';

  ngOnInit(): void {
    this.list();
  }

  async list() {
    const service = this.specieService.getAll.bind(this.specieService);
    const count = (await this.specieService.getAll()).count;
    this.data = await this.toolService.allData(service, count);
  }
}
