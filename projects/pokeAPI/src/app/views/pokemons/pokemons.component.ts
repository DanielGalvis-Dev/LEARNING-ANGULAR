import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { apiSections, pokemonImage } from '../../settings/appsettings';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { results } from '../../models/res.model';
import { ToolsService } from '../../services/tools.service';
import { NgClass } from '@angular/common';
import { details } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgClass,
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

  section = apiSections.pokemon;
  imageSvg = pokemonImage.svg;
  imageGif = pokemonImage.gif;
  imagePng = pokemonImage.png;

  results: results[] = [];
  urls!: string[];
  options: number[] = [];
  selected = this.options[0];

  async list(amount: number) {
    const res = await this.pokemonService.getAll(this.section, amount);
    this.results = res.results;
    this.optionsSelect(res.count);

    const urls = res.results.map((res) => res.url);
    this.urls = urls;
    // console.log(url);
    this.getDetails(urls);
  }

  svgImage(url: string) {
    const id = this.toolService.extractIdOfTheUrl(url);
    // const svg = `${this.imageSvg}${id}.svg`;
    const png = `${this.imagePng}${id}.png`;
    return png;
  }

  gifImage(url: string) {
    const id = this.toolService.extractIdOfTheUrl(url);
    const gif = `${this.imageGif}${id}.gif`;
    // console.log(gif);
    return gif;
  }

  details!: details[];

  async getDetails(urls: string[]) {
    const details = await Promise.all(
      urls.map(async (url) => {
        const idToUrl: number = this.toolService.extractIdOfTheUrl(url);
        const res = await this.pokemonService.getOne(this.section, idToUrl);
        const id = res.id;
        const abilities = res.abilities.map((ability) => {
          return ability.ability.name;
        });
        const locations = res.location_area_encounters;
        const types = res.types.map((type) => {
          return type.type.name;
        });
        const height = res.height;
        const weight = res.weight;
        return {
          id: id,
          types: types,
          abilities: abilities,
          weight: weight,
          locations: locations,
          height: height,
          state: false,
        };
      })
    );

    this.details = details;
  }

  seeDetails(id: number) {
    this.details.forEach((detail) => {
      if (detail.id === id) {
        detail.state = detail.state === false ? true : false;
      }
    });
  }

  optionsSelect(count: number) {
    for (let i = 1; i < count; i++) {
      i = i + 9;
      if (!this.options.includes(i)) {
        this.options.push(i);
      }
    }
  }
}
