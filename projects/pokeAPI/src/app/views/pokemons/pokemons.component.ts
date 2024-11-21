import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { apiSections, pokemonImage } from '../../settings/appsettings';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { results } from '../../models/res.model';
import { ToolsService } from '../../services/tools.service';
import { ability } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
})
export class PokemonsComponent implements OnInit {
  pokemonService = inject(PokemonService);
  toolService = inject(ToolsService);

  ngOnInit(): void {
    this.list(10);
    // this.get(1);
  }

  sections = apiSections;
  imageSvg = pokemonImage.svg;
  imageGif = pokemonImage.gif;
  imagePng = pokemonImage.png;

  results: results[] = [];

  options = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  selected = this.options[0];

  async list(amount: number) {
    const res = await this.pokemonService.getAll(this.sections.pokemon, amount);
    this.results = res.results;
    if (!this.options.includes(res.count)) {
      this.options.push(res.count);
    }
    // console.log(this.results);
  }

  // abilities: string[] = [];

  // async get(id: number) {
  // async get(url: string) {
  //   const id = this.toolService.extractIdOfTheUrl(url);
  //   const pokemon = await this.pokemonService.getOne(this.sections.pokemon, id);
  //   const abilities = pokemon.abilities.map((element) => {
  //     return element.ability.name;
  //   });
  //   // return abilities;
  //   // console.log(abilities);
  // }

  svgImage(url: string) {
    const id = this.toolService.extractIdOfTheUrl(url);
    const svg = `${this.imageSvg}${id}.svg`;
    console.log(svg);
    const png = `${this.imagePng}${id}.png`;
    console.log(svg.length);
    // if (svg) {
      // return svg;
    // } else {
      return png;
    // }
  }

  gifImage(url: string) {
    const id = this.toolService.extractIdOfTheUrl(url);
    const gif = `${this.imageGif}${id}.gif`;
    // console.log(gif);
    return gif;
  }
}
