import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { starships, starshipsResults } from '../models/starships';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient);
  private starships: string = apiUrl.starships;

  async listar(page: string = '') {
    const observable = this.http.get<starships>(`${this.starships}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async obtener(id: number) {
    const observable = this.http.get<starshipsResults>(
      `${this.starships}/${id}`
    );
    const res = await firstValueFrom(observable);
    return res;
  }
}
