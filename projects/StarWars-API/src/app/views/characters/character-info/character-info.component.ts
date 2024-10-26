import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { character } from '../../../models/characters.model';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../layouts/card-header/card-header.component';
import { CharacterCardContentComponent } from './character-card-content/character-card-content.component';
import { CardContentComponent } from '../../layouts/card-content/card-content.component';
// import {  } from '@angular/material/';
@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [
    MatCardModule,
    CharacterCardContentComponent,
    CardHeaderComponent,
    CardContentComponent,
  ],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInfoComponent implements OnInit {
  private characterService = inject(CharactersService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.obtener();
    const res = await this.characterService.listar();
    this.count = res.count;
  }

  characterInfo: character = {} as character;
  id: number = 0;
  count: number = 0;
  name: string = '';

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Obtener información del personaje
    this.characterInfo = await this.characterService.obtener(this.id);
    this.router.navigate(['character', this.id]);
    this.name = this.characterInfo.name;
    // console.log('Info:', this.characterInfo);
  }
}
