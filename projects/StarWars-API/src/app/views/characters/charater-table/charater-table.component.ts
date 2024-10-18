import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { ToolsService } from '../../../services/tools.service';
import { APIRes, character } from '../../../models/characters';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-charater-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatPaginator],
  templateUrl: './charater-table.component.html',
  styleUrl: './charater-table.component.css',
})
export class CharaterTableComponent implements AfterViewInit, OnInit {
  // Services
  private toolsService = inject(ToolsService);
  private charactersService = inject(CharactersService);

  // characterModel
  APIRes: APIRes = {} as APIRes; // Almacenará toda la respuesta de la API
  results: character[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  characterCount = 0;
  nextPage: string = '';
  pageSizeOptions: number[] = [8, 20, 50, this.characterCount];

  // Constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  dataSource = new MatTableDataSource<character>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Asignar el paginador inicialmente
    this.dataSource.paginator = this.paginator;
  }

  // Listar Personajes
  async list() {
    const res = await this.charactersService.listar();
    this.characterCount = res.count;
    const count = this.toolsService.readonly(this.characterCount);
    // console.log(count);

    for (let i = 0; i < count; i++) {
      let data = await this.charactersService.listar(this.nextPage);
      this.results = this.results.concat(data.results);
      this.nextPage = this.toolsService.extractOfUrl(data.next);
    }

    // Actualiza la fuente de datos
    // this.dataSource.data = data.results;
    this.dataSource.data = this.results;
    this.dataSource.paginator = this.paginator; // Reasigna el paginador
  }

  // Ver informacion detallada del personaje
  viewInfo(object: character) {
    const id = this.toolsService.extractOfUrl(object.url!);
    this.router.navigate(['characters', id]);
  }
}
