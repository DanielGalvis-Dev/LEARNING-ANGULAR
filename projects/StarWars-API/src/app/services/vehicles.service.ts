import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { vehicles, vehiclesResults } from '../models/vehicles';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);
  private vehicles: string = apiUrl.vehicles;

  listar(page: string = '') {
    return this.http.get<vehicles>(`${this.vehicles}/?${page}`);
  }

  obtener(id: number) {
    return this.http.get<vehiclesResults>(`${this.vehicles}/${id}`);
  }
}
