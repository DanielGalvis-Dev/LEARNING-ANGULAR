import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { species, speciesResults } from '../models/species';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private http = inject(HttpClient);
  private species: string = apiUrl.species;

  async listar(page: string = '') {
    const observable = this.http.get<species>(`${this.species}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async obtener(id: number) {
    const observable = this.http.get<speciesResults>(`${this.species}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
