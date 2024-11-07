import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToolsService } from '../../services/tools.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  // Variables de entrada
  @Input('data') data!: any[];
  @Input('location') location!: string;
  @Input('icon') icon!: string;

  // Servicio de herramientas
  private toolService = inject(ToolsService);

  // Variables  de la tabla
  displayedColumns: string[] = ['id', 'name', 'action'];
  pageSizeOptions: number[] = [5, 10, 20];
  hidePageSize: boolean = false;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      if (this.data.length > 0) {
        // console.log(this.data);
        this.dataSource.data = this.data; // Actualiza la fuente de datos
        this.dataSource.paginator = this.paginator; // Reasigna el paginador
        this.validation();
      }
    }
  }

  validation() {
    if (this.location === 'film') {
      this.hidePageSize = true;
    } else {
      this.hidePageSize = false;
    }
  }

  convertUrlToId(url: string) {
    const id = parseInt(this.toolService.extractOfUrl(url));
    return id;
  }

  // Ver informacion detallada del elemento (peoples, planets, films, species, vehicles, starships)
  seeElemet(url: string) {
    if (url) {
      this.toolService.goLocation(url, this.location); // Redirigimos a la ubicación del elemento
    }
  }
}
