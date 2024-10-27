import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VehiclesService } from '../../../services/vehicles.service';
import { ToolsService } from '../../../services/tools.service';
import { vehicles, vehiclesResults } from '../../../models/vehicles.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [MatPaginator, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.css',
})
export class VehicleTableComponent implements AfterViewInit, OnInit {
  // Services
  private toolService = inject(ToolsService);
  private vehicleService = inject(VehiclesService);

  // vehicleModel
  vehicles: vehicles = {} as vehicles; // Almacenará toda la respuesta de la API
  results: vehiclesResults[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  vehicleCount = 0;
  nextPage: string = '';
  pageSizeOptions: number[] = [8, 20];
  population: number = 0;

  ngOnInit(): void {
    this.list();
  }

  dataSource = new MatTableDataSource<vehiclesResults>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Asignar el paginador inicialmente
    this.dataSource.paginator = this.paginator;
  }

  // Listar Personajes
  async list() {
    const res = await this.vehicleService.listar();
    this.vehicleCount = res.count;
    const count = this.toolService.readonly(this.vehicleCount);
    // console.log(this.vehicleCount);

    for (let i = 0; i < count; i++) {
      let data = await this.vehicleService.listar(this.nextPage);
      this.results = this.results.concat(data.results);
      this.nextPage = this.toolService.extractOfUrl(data.next);
    }

    // Actualiza la fuente de datos
    // this.dataSource.data = data.results;
    this.dataSource.data = this.results;
    this.dataSource.paginator = this.paginator; // Reasigna el paginador
  }

  // Ver informacion detallada del personaje
  viewInfo(url: string) {
    this.toolService.goLocation(url, 'vehicle');
  }
}
