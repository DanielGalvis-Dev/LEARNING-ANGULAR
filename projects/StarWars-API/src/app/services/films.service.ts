import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { films, filmsResults } from '../models/films';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);
  private films: string = apiUrl.films;

  async listar() {
    const observable = this.http.get<films>(this.films);
    const res = await firstValueFrom(observable);
    return res;
  }

  async obtener(id: number) {
    const observable = this.http.get<filmsResults>(`${this.films}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
