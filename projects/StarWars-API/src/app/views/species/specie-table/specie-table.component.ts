import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToolsService } from '../../../services/tools.service';
import { SpeciesService } from '../../../services/species.service';
import { species, speciesResults } from '../../../models/species';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-specie-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    MatTooltipModule,
  ],
  templateUrl: './specie-table.component.html',
  styleUrl: './specie-table.component.css',
})
export class SpecieTableComponent implements AfterViewInit, OnInit {
  // Services
  private toolsService = inject(ToolsService);
  private specieService = inject(SpeciesService);

  // specieModel
  species: species = {} as species; // Almacenará toda la respuesta de la API
  results: speciesResults[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  specieCount = 0;
  nextPage: string = '';
  pageSizeOptions: number[] = [8, 20];
  population: number = 0;

  ngOnInit(): void {
    this.list();
  }

  dataSource = new MatTableDataSource<speciesResults>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Asignar el paginador inicialmente
    this.dataSource.paginator = this.paginator;
  }

  // Listar Personajes
  async list() {
    const res = await this.specieService.listar();
    this.specieCount = res.count;
    const count = this.toolsService.readonly(this.specieCount);
    console.log(this.specieCount);

    for (let i = 0; i < count; i++) {
      let data = await this.specieService.listar(this.nextPage);
      this.results = this.results.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }

    // Actualiza la fuente de datos
    // this.dataSource.data = data.results;
    this.dataSource.data = this.results;
    this.dataSource.paginator = this.paginator; // Reasigna el paginador
  }

  // Ver informacion detallada del personaje
  viewInfo(object: speciesResults) {
    this.toolsService.goLocation(object.url, 'specie');
  }
}
