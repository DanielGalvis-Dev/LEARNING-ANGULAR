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
  private url: string = apiUrl.planets;

  async getAll(page: string = '') {
    const observable = this.http.get<planets>(`${this.url}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<planetsRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<planets>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
