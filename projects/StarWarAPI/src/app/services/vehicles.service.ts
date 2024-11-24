import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { vehicles, vehiclesRes } from '../models/vehicles.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);
  private url: string = apiUrl.vehicles;

  async getAll(page: string = '') {
    const observable = this.http.get<vehicles>(`${this.url}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<vehiclesRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<vehicles>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
