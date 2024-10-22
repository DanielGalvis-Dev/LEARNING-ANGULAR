import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // Herramienta para extaer el parameto page o el id
  extractOfUrl(url: string) {
    let separeUrl: string[] = [];
    let res: number | string = '';
    if (url) {
      if (url.includes('?')) {
        separeUrl = url.split('?');
        res = separeUrl[1];
      } else {
        separeUrl = url.split('/');
        res = separeUrl[5];
      }
    }
    // console.log(res);
    return res;
  }

  readonly(count: number) {
    let res = count / 10;
    res = Math.ceil(res);
    return res;
  }

  formatDate(dateP: string) {
    const date = new Date(dateP);

    // Formatear la fecha a un formato más entendible
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
}
