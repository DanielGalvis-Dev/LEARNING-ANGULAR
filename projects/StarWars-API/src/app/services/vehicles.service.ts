import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { vehicles, vehiclesResults } from '../models/vehicles';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);
  private vehicles: string = apiUrl.vehicles;

  async listar(page: string = '') {
    const observable = this.http.get<vehicles>(`${this.vehicles}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async obtener(id: number) {
    const observable = this.http.get<vehiclesResults>(`${this.vehicles}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
