import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { filmsResults } from '../../../../../models/films';
import { CharactersService } from '../../../../../services/characters.service';
import { ToolsService } from '../../../../../services/tools.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SectionHeaderComponent } from '../../../../layouts/section-header/section-header.component';
import { character } from '../../../../../models/characters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-characters',
  standalone: true,
  imports: [MatCardModule, MatListModule, SectionHeaderComponent],
  templateUrl: './film-characters.component.html',
  styleUrl: './film-characters.component.css',
})
export class FilmCharactersComponent implements OnChanges {
  @Input() filmInfo!: filmsResults;
  private characterService = inject(CharactersService);
  private toolService = inject(ToolsService);
  private router = inject(Router);
  characterData: character[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
      this.obtener();
    }
  }

  async obtener() {
    const data = this.filmInfo.characters;
    const service = this.characterService.obtener.bind(this.characterService);
    if (data) {
      this.characterData = await this.toolService.getData(data, service);
    }
  }

  seeCharacter(url: string) {
    const id = parseInt(this.toolService.extractOfUrl(url));
    this.router.navigate(['character', id]);
  }
}
