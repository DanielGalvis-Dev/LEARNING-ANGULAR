import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToolsService } from '../../../services/tools.service';
import { PlanetsService } from '../../../services/planets.service';
import { planets, planetsResults } from '../../../models/planets';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-planet-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    MatTooltipModule,
  ],
  templateUrl: './planet-table.component.html',
  styleUrl: './planet-table.component.css',
})
export class PlanetTableComponent implements AfterViewInit, OnInit {
  // Services
  private toolsService = inject(ToolsService);
  private planetService = inject(PlanetsService);

  // planetModel
  planets: planets = {} as planets; // Almacenará toda la respuesta de la API
  results: planetsResults[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  planetCount = 0;
  nextPage: string = '';
  pageSizeOptions: number[] = [8, 20];
  population: number = 0;
  // Constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  dataSource = new MatTableDataSource<planetsResults>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Asignar el paginador inicialmente
    this.dataSource.paginator = this.paginator;
  }

  // Listar Personajes
  async list() {
    const res = await this.planetService.listar();
    this.planetCount = res.count;
    const count = this.toolsService.readonly(this.planetCount);
    console.log(this.planetCount);

    for (let i = 0; i < count; i++) {
      let data = await this.planetService.listar(this.nextPage);
      this.results = this.results.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }

    // Actualiza la fuente de datos
    // this.dataSource.data = data.results;
    this.dataSource.data = this.results;
    this.dataSource.paginator = this.paginator; // Reasigna el paginador
  }

  // Ver informacion detallada del personaje
  viewInfo(object: planetsResults) {
    const id = this.toolsService.extractOfUrl(object.url!);
    this.router.navigate(['planet', id]);
  }
}
