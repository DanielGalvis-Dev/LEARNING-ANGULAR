import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { apiSections } from '../../../settings/appsettings';
import { results } from '../../../models/res.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-types',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.css',
})
export class PokemonTypesComponent implements OnInit {
  pokemonService = inject(PokemonService);
  type = apiSections.type;

  types: results[] = [];
  ngOnInit(): void {
    this.getTypes();
  }

  async getTypes() {
    const res = await this.pokemonService.getAll(this.type, 0, 21);
    this.types = res.results.slice(0, -3);
    console.log(this.types);
  }
}
