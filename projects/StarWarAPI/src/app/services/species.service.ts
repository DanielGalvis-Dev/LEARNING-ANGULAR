import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { species, speciesRes } from '../models/species.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private http = inject(HttpClient);
  private species: string = apiUrl.species;

  async getAll(page: string = '') {
    const observable = this.http.get<species>(`${this.species}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getOne(id: number) {
    const observable = this.http.get<speciesRes>(`${this.species}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
