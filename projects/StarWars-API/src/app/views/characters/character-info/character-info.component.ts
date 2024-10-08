import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { character } from '../../../models/characters';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InfoComponent } from './info/info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
// import {  } from '@angular/material/';
@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    InfoComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.css',
})
export class CharacterInfoComponent implements OnInit {
  private characterService = inject(CharactersService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtener();
  }

  characterInfo: character = {} as character;
  id!: number;

  async obtener() {
    const params = await firstValueFrom(this.route.params);
    this.id = parseInt(params['id']);
    this.characterInfo = await firstValueFrom(
      this.characterService.obtener(this.id)
    );
  }

  volver() {
    this.router.navigate(['/']);
  }
}
