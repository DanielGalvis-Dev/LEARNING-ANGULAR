import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { APIRes, character } from '../../../models/characters';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InfoComponent } from './info/info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolsService } from '../../../services/tools.service';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInfoComponent implements OnInit {
  private toolService = inject(ToolsService);
  private characterService = inject(CharactersService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtener();
  }

  characterInfo: character = {} as character;
  id!: number;

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Obtener información del personaje
    this.characterInfo = await firstValueFrom(
      this.characterService.obtener(this.id)
    );
    this.router.navigate(['characterinfo', this.id]);
    // console.log('Info:', this.characterInfo);
  }

  volver() {
    this.router.navigate(['/']);
  }

  next() {
    if (this.id <= 82) {
      this.id = this.id + 1;
      this.obtener(this.id);
    }
    // console.log('id:', this.id);
  }

  prev() {
    if (this.id >= 1) {
      this.id = this.id - 1;
      this.obtener(this.id);
    }
    // console.log('id:', this.id);
  }
}
