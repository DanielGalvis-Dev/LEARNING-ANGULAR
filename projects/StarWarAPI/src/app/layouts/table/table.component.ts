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
  @Input('data') data!: any[];
  @Input('location') location!: string;
  @Input('icon') icon!: string;

  private toolService = inject(ToolsService);

  displayedColumns: string[] = ['info', 'action'];
  pageSizeOptions: number[] = [5, 10, 20];
  hidePageSize: boolean = false;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      // console.log(this.data);
      this.dataSource.data = this.data; // Actualiza la fuente de datos
      this.dataSource.paginator = this.paginator; // Reasigna el paginador
      this.validation();
    }
  }

  validation() {
    if (this.location === 'film') {
      this.hidePageSize = true;
    } else {
      this.hidePageSize = false;
    }
  }

  // Ver informacion detallada del elemento (peoples, planets, films, species, vehicles, starships)
  seeElemet(url: string) {
    this.toolService.goLocation(url, this.location);
  }
}
