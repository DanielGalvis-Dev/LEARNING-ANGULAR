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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToolsService } from '../../services/tools.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
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
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      if (this.data.length > 0) {
        // console.log(this.data);
        this.dataSource.data = this.data; // Actualiza la fuente de datos
        this.dataSource.paginator = this.paginator; // Reasigna el paginador
        this.dataSource.sort = this.sort;
        this.validation();
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
