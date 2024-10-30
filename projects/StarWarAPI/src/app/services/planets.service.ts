import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { planets, planetsRes } from '../models/planets.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private http = inject(HttpClient);
  private planets: string = apiUrl.planets;

  async getAll(page: string = '') {
    const observable = this.http.get<planets>(`${this.planets}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getOne(id: number) {
    const observable = this.http.get<planetsRes>(`${this.planets}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
