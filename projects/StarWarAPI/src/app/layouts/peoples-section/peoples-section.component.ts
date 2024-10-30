import { Component, inject, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-peoples-section',
  standalone: true,
  imports: [],
  templateUrl: './peoples-section.component.html',
  styleUrl: './peoples-section.component.css'
})
export class PeoplesSectionComponent  {
  @Input() filmInfo!: any;
  // private characterService = inject(CharactersService);
  // private toolService = inject(ToolsService);
  // private router = inject(Router);
  // characterData: character[] = [];

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['filmInfo'] && changes['filmInfo'].currentValue) {
  //     this.obtener();
  //   }
  // }

  // async obtener() {
  //   const data = this.filmInfo.characters;
  //   const service = this.characterService.obtener.bind(this.characterService);
  //   if (data) {
  //     this.characterData = await this.toolService.getData(data, service);
  //   }
  // }

  // seeCharacter(url: string) {
  //   this.toolService.goLocation(url, 'character');
  // }
}
