import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { species, speciesResults } from '../models/species';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private http = inject(HttpClient);
  private species: string = apiUrl.species;

  listar(page: string = '') {
    return this.http.get<species>(`${this.species}/?${page}`);
  }

  obtener(id: number) {
    return this.http.get<speciesResults>(`${this.species}/${id}`);
  }
}
