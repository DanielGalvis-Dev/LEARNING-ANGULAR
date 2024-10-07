import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { APIRes, character } from '../../models/characters';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatPaginator,
    MatFormFieldModule,
  ],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements AfterViewInit {
  private charactersService = inject(CharactersService);
  private toolsService = inject(ToolsService);
  APIRes: APIRes = {} as APIRes; // Almacenará toda la respuesta de la API
  results: character[] = []; // Lista de personajes
  displayedColumns: string[] = ['info', 'action'];
  characterCount = 0;
  nextPage: string = '';

  constructor(private router: Router) {
    this.list();
  }

  dataSource = new MatTableDataSource<character>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // async list(page: string = '') {
  //   const res = await firstValueFrom(this.charactersService.listar(page));

  //   // Asignamos la respuesta completa a APIRes
  //   this.APIRes = res;

  //   // Asignamos los resultados (lista de personajes) a 'results'
  //   this.results = res.results;

  //   // Asignamos otros valores si es necesario
  //   this.count = res.count;

  //   this.anterior = res.previous;
  //   this.siguiente = res.next;

  //   this.dataSource.data = this.results; // Actualiza la fuente de datos
  //   this.dataSource.paginator = this.paginator; // Reasigna el paginador (por si acaso)
  // }

  async list() {
    const data = await firstValueFrom(this.charactersService.listar());
    this.characterCount = data.count;
    const count = this.toolsService.readonly(this.characterCount);

    for (let i = 0; i < count; i++) {
      let data = await firstValueFrom(
        this.charactersService.listar(this.nextPage)
      );
      this.nextPage = '';
      this.results = this.results.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }
    this.dataSource.data = this.results; // Actualiza la fuente de datos
    this.dataSource.paginator = this.paginator; // Reasigna el paginador (por si acaso)
  }

  viewInfo(object: character) {
    const id = this.toolsService.extractOfUrl(object.url!);
    this.router.navigate(['characterinfo', id]);
  }

  // prev() {
  //   const previous = this.APIRes.previous;
  //   const page = this.toolsService.extractOfUrl(previous!);
  //   if (page) {
  //     this.list(page);
  //   }
  // }

  // next() {
  //   const next = this.APIRes.next;
  //   const page = this.toolsService.extractOfUrl(next!);
  //   if (page) {
  //     this.list(page);
  //   }
  // }
}
