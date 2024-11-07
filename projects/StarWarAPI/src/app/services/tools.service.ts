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
    // console.log(res);
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
      const res = await service(id); // Llama al servicio para obtener los datos
      return res;
    });
    // Espera a que todas las promesas se resuelvan y devuelve los datos
    const newData = await Promise.all(newInfo);
    return newData;
  }

  // Navega a una ubicación específica usando el router
  goLocation(url: string, location: string) {
    const id = parseInt(this.extractOfUrl(url.toString())); // Extrae el ID de la URL
    this.router.navigate([location, id]); // Navega a la nueva ubicación
  }

  async allData<T>(
    // Función de servicio que toma un string (página) y devuelve una promesa de datos paginados
    service: (page: string) => Promise<PagedData<T>>,
    count: number // Total de elementos que se espera obtener
  ) {
    let nextPage: string = ''; // Inicializa la variable para la siguiente página como una cadena vacía
    let results: any[] = []; // Inicializa un array vacío para almacenar los resultados
    const numberOfPages = this.roundPages(count); // Calcula el número total de páginas a partir del conteo total

    // Itera a través del número de páginas
    for (let i = 0; i < numberOfPages; i++) {
      let data = await service(nextPage); // Llama al servicio para obtener los datos de la página actual
      results = results.concat(data.results); // Agrega los resultados obtenidos a la lista de resultados
      nextPage = this.extractOfUrl(data.next); // Extrae la URL de la siguiente página de los datos obtenidos
    }
    // console.log(results);

    return results; // Devuelve todos los resultados recopilados
  }

  ids!: number[];

  convertAllUrlToId(obj: any[]) {
    let ids!: number[];
    if (obj.length > 0) {
      const urls = obj.map((element) => {
        return element.url;
      });
      // console.log(urls);

      if (urls.length > 0) {
        ids = urls.map((url) => {
          return parseInt(this.extractOfUrl(url));
        });
      }
    }
    this.ids = ids;
    return ids;
  }

  recoverId() {
    return this.ids;
  }
}
