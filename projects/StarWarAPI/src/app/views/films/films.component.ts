import { Component, inject, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { filmsRes } from '../../models/films.model';
import { TableComponent } from '../../layouts/table/table.component';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent implements OnInit {
  private filmService = inject(FilmsService);

  // Parametros
  data: filmsRes[] = [];
  icon = 'movie';
  location = 'film';

  ngOnInit(): void {
    this.list();
  }

  async list() {
    this.data = (await this.filmService.getAll()).results;
  }
}
