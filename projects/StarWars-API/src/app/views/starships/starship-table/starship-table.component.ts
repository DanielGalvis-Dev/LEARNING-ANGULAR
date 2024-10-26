import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from '../../../services/tools.service';
import { StarshipsService } from '../../../services/starships.service';
import { starships, starshipsResults } from '../../../models/starships.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-starship-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginator,
  ],
  templateUrl: './starship-table.component.html',
  styleUrl: './starship-table.component.css',
})
export class StarshipTableComponent implements AfterViewInit, OnInit {
  // Services
  private toolService = inject(ToolsService);
  private starshipService = inject(StarshipsService);

  // starshipModel
  starships: starships = {} as starships; // Almacenará toda la respuesta de la API
  results: starshipsResults[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  starshipCount = 0;
  nextPage: string = '';
  pageSizeOptions: number[] = [8, 20];
  population: number = 0;

  ngOnInit(): void {
    this.list();
  }

  dataSource = new MatTableDataSource<starshipsResults>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Asignar el paginador inicialmente
    this.dataSource.paginator = this.paginator;
  }

  // Listar Personajes
  async list() {
    const res = await this.starshipService.listar();
    this.starshipCount = res.count;
    const count = this.toolService.readonly(this.starshipCount);
    // console.log(this.starshipCount);

    for (let i = 0; i < count; i++) {
      let data = await this.starshipService.listar(this.nextPage);
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
    this.toolService.goLocation(url, 'starship');
  }
}
