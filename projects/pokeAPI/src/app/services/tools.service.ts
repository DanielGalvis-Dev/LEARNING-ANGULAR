import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  extractIdOfTheUrl(url: string) {
    const separeUrl = url.split('/');
    const id = parseInt(separeUrl[6]);
    // console.log(id);
    return id;
  }
}
