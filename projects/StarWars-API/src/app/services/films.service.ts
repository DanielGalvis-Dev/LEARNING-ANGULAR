import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { films, filmsResults } from '../models/films';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);
  private films: string = apiUrl.films;

  listar() {
    return this.http.get<films>(this.films);
  }

  obtener(id: number) {
    return this.http.get<filmsResults>(`${this.films}/${id}`);
  }
}
