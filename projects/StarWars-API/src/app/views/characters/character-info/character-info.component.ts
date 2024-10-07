import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { character } from '../../../models/characters';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InfoComponent } from './info/info.component';
// import {  } from '@angular/material/';
@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, InfoComponent],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.css',
})
export class CharacterInfoComponent {
  private characterService = inject(CharactersService);
  constructor(private router: Router, private route: ActivatedRoute) {
    this.obtener();
  }
  characterInfo: character = {} as character;

  async obtener() {
    const params = await firstValueFrom(this.route.params);
    const id = params['id'];
    this.characterInfo = await firstValueFrom(
      this.characterService.obtener(id)
    );
  }

  volver() {
    this.router.navigate(['/']);
  }
}
