import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../layouts/table/table.component';
import { PeoplesService } from '../../services/peoples.service';
import { ToolsService } from '../../services/tools.service';
import { peoplesRes } from '../../models/peoples.model';

@Component({
  selector: 'app-peoples',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.css',
})
export class PeoplesComponent implements OnInit {
  private toolService = inject(ToolsService);
  private peopleService = inject(PeoplesService);

  // Parametros
  data: peoplesRes[] = [];
  icon = 'person';
  location = 'people';

  ngOnInit(): void {
    this.list();
  }
  
  async list() {
    const service = this.peopleService.getAll.bind(this.peopleService);
    const count = (await this.peopleService.getAll()).count;
    this.data = await this.toolService.allData(service, count);
  }
}
