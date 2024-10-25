import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../layouts/card-header/card-header.component';
import { SpeciesService } from '../../../services/species.service';
import { species, speciesResults } from '../../../models/species';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SpecieCardContentComponent } from "./specie-card-content/specie-card-content.component";

@Component({
  selector: 'app-specie-info',
  standalone: true,
  imports: [MatCardModule, CardHeaderComponent, SpecieCardContentComponent],
  templateUrl: './specie-info.component.html',
  styleUrl: './specie-info.component.css',
})
export class SpecieInfoComponent {
  private specieService = inject(SpeciesService);
  speciesData: species = {} as species;
  specieInfo: speciesResults = {} as speciesResults;

  // Parametros

  // Id
  id: number = 0;

  // Cantidad de Peliculas
  count: number = 0;

  // Nombre de la pelicula
  name: string = '';

  //
  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.obtener();

    // Obtener información del personaje
    this.speciesData = await this.specieService.listar();
    this.count = this.speciesData.count;
  }

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;
    // Obtener información del personaje
    this.specieInfo = await this.specieService.obtener(this.id);
    this.name = this.specieInfo.name;
    this.router.navigate(['specie', this.id]);
    // console.log('Info:', this.specieInfo);
  }
}
