import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { films, filmsRes } from '../models/films.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);
  private url: string = apiUrl.films;

  async getAll() {
    const observable = this.http.get<films>(this.url);
    const res = await firstValueFrom(observable);
    // console.log(res);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<filmsRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<films>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
