import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { starships, starshipsRes } from '../models/starships.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient);
  private url: string = apiUrl.starships;

  async getAll(page: string = '') {
    const observable = this.http.get<starships>(`${this.url}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<starshipsRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<starships>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
