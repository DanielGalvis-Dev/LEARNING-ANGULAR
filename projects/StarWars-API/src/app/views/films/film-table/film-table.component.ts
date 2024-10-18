import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ToolsService } from '../../../services/tools.service';
import { Router } from '@angular/router';
import { films, filmsResults } from '../../../models/films';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-film-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './film-table.component.html',
  styleUrl: './film-table.component.css',
})
export class FilmTableComponent {
  // Services
  private toolService = inject(ToolsService);
  private filmService = inject(FilmsService);

  // characterModel
  films: films = {} as films; // Almacenará toda la respuesta de la API
  results: filmsResults[] = []; // Lista de personajes

  // Variables
  displayedColumns: string[] = ['info', 'action'];
  // Constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  // Listar Peliculas
  async list() {
    const data = await this.filmService.listar();
    this.results = data.results;
  }

  // Ver informacion detallada del personaje
  viewInfo(object: filmsResults) {
    const id = this.toolService.extractOfUrl(object.url!);
    this.router.navigate(['films', id]);
  }
}
