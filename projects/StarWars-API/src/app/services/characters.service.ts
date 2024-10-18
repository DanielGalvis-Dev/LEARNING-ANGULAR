import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIRes, character } from '../models/characters';
import { apiUrl } from '../settings/appsettings';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private http = inject(HttpClient);
  private people: string = `${apiUrl.people}`;

  async listar(page: string = '') {
    const observable = this.http.get<APIRes>(`${this.people}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async obtener(id: number) {
    const observable = this.http.get<character>(`${this.people}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
