import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIRes, character } from '../models/characters';
import { apiUrl } from '../settings/appsettings';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private http = inject(HttpClient);
  private people: string = `${apiUrl.people}`;

  listar(page: string = '') {
    return this.http.get<APIRes>(`${this.people}/?${page}`);
  }

  obtener(id: number) {
    return this.http.get<character>(`${this.people}/${id}`);
  }
}
