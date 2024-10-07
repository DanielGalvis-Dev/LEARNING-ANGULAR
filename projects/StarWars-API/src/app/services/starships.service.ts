import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { starships, starshipsResults } from '../models/starships';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient);
  private starships: string = apiUrl.starships;

  listar(page: string = '') {
    return this.http.get<starships>(`${this.starships}/?${page}`);
  }

  obtener(id: number) {
    return this.http.get<starshipsResults>(`${this.starships}/${id}`);
  }
}
