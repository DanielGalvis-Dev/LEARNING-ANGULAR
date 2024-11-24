import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../settings/appsettings';
import { peoples, peoplesRes } from '../models/peoples.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeoplesService {
  private http = inject(HttpClient);
  private url: string = apiUrl.peoples;

  async getAll(page: string = '') {
    const observable = this.http.get<peoples>(`${this.url}/?${page}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getById(id: number) {
    const observable = this.http.get<peoplesRes>(`${this.url}/${id}`);
    const res = await firstValueFrom(observable);
    return res;
  }

  async getByName(name: string) {
    const observable = this.http.get<peoples>(`${this.url}/?search=${name}`);
    const res = await firstValueFrom(observable);
    return res;
  }
}
