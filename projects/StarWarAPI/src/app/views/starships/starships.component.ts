import { Component, inject, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { StarshipsService } from '../../services/starships.service';
import { starshipsRes } from '../../models/starships.model';
import { TableComponent } from "../../layouts/table/table.component";

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css',
})
export class StarshipsComponent implements OnInit {
  private toolService = inject(ToolsService);
  private starshipService = inject(StarshipsService);

  // Parametros
  data: starshipsRes[] = [];
  icon = 'rocket_launch';
  location = 'starship';

  ngOnInit(): void {
    this.list();
  }

  async list() {
    const service = this.starshipService.getAll.bind(this.starshipService);
    const count = (await this.starshipService.getAll()).count;
    this.data = await this.toolService.allData(service, count);
  }
}
