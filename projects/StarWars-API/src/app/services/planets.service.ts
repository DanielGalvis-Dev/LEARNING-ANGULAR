import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { planets, planetsResults } from '../models/planets';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private http = inject(HttpClient);
  private planets: string = apiUrl.planets;

  listar(page: string = '') {
    return this.http.get<planets>(`${this.planets}/?${page}`);
  }

  obtener(id: number) {
    return this.http.get<planetsResults>(`${this.planets}/${id}`);
  }
}
