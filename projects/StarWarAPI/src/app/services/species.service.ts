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
  private url: string = apiUrl.species;

  async getAll(page: string = '') {
    const observable = this.http.get<species>(`${this.url}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<speciesRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<species>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
