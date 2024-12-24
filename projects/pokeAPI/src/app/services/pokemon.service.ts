import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { response, results } from '../models/res.model';
import { firstValueFrom } from 'rxjs';
import { pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private url = apiUrl.url;

  async getAll(
    section: string = 'pokemon',
    offset: number = 0,
    limit: number = 100
  ) {
    const observable = this.http.get<response>(
      `${this.url}${section}?offset=${offset}&limit=${limit}`
    );
    const res = await firstValueFrom(observable);
    // console.log(res);
    return res;
  }

  async getOne(section: string, id: number) {
    const observable = this.http.get<pokemon>(`${this.url}${section}${id}`);
    const res = await firstValueFrom(observable);
    // console.log(res);
    return res;
  }
}
