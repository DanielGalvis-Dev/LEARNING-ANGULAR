import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface PagedData<T> {
  results: T[];
  next: string;
}
// Marca esta clase como inyectable y disponible en la raíz del módulo
@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // Inyecta el servicio Router para la navegación
  constructor(private router: Router) {}

  // Herramienta para extraer el parámetro page o el id de una URL
  extractOfUrl(url: string): string {
    let separeUrl: string[] = [];
    let res: string = '';

    // Verifica si la URL no es nula
    if (url) {
      // Si la URL contiene un '?', separa y extrae la parte después del '?'
      if (url.includes('?')) {
        separeUrl = url.split('?');
        res = separeUrl[1];
      } else {
        // Si no, separa la URL por '/' y extrae la quinta parte
        separeUrl = url.split('/');
        res = separeUrl[5];
      }
    }
    // Devuelve el resultado extraído
    return res;
  }

  // Herramienta para calcular la cantidad de páginas necesarias
  roundPages(count: number): number {
    let res = count / 10;
    res = Math.ceil(res); // Redondea el resultado hacia arriba
    return res;
  }

  // Formatea una fecha en un formato más entendible
  formatDate(dateP: string): string {
    const date = new Date(dateP);
    // Formatea la fecha según la configuración regional 'es-ES'
    const formattedDate = date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    return formattedDate;
  }

  // Obtiene datos de un servicio dado un array de URLs
  async getData<T>(
    data: string[],
    service: (id: number) => Promise<T>
  ): Promise<T[]> {
    // Mapea los datos a promesas de solicitudes HTTP
    const newInfo = data.map(async (info) => {
      const id = parseInt(this.extractOfUrl(info)); // Extrae el ID de la URL
      // console.log(id);
      const res = await service(id); // Llama al servicio para obtener los datos
      return res;
    });
    // Espera a que todas las promesas se resuelvan y devuelve los datos
    const newData = await Promise.all(newInfo);
    return newData;
  }

  // Navega a una ubicación específica usando el router
  goLocation(url: string, location: string) {
    const id = parseInt(this.extractOfUrl(url)); // Extrae el ID de la URL
    this.router.navigate([location, id]); // Navega a la nueva ubicación
  }

  async allData<T>(
    service: (page: string) => Promise<PagedData<T>>,
    count: number
  ) {
    let nextPage: string = '';
    let results: any[] = [];
    const numberOfPages = this.roundPages(count);
    // console.log(numberOfPages);

    for (let i = 0; i < numberOfPages; i++) {
      let data = await service(nextPage);
      results = results.concat(data.results);
      nextPage = this.extractOfUrl(data.next);
    }

    // console.log(results);
    return results;
  }
}
