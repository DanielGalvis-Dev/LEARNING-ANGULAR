import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { speciesRes } from '../../../models/species.model';
import { SpeciesService } from '../../../services/species.service';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { SpecieBasicInfoComponent } from './specie-basic-info/specie-basic-info.component';
import { PeoplesSectionComponent } from '../../../layouts/sections/peoples-section/peoples-section.component';
import { FilmsSectionComponent } from '../../../layouts/sections/films-section/films-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';

@Component({
  selector: 'app-specie-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    SpecieBasicInfoComponent,
    PeoplesSectionComponent,
    FilmsSectionComponent,
    DatesSectionComponent,
  ],
  templateUrl: './specie-info.component.html',
  styleUrl: './specie-info.component.css',
})
export class SpecieInfoComponent implements OnInit {
  // Inyecta el servicio SpeciesService para poder utilizar sus métodos
  private specieService = inject(SpeciesService);

  // Constructor que recibe el router y la ruta activada
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    // Llama al método obtener para cargar la información
    this.obtener();
    // Obtiene el conteo total de especies desde el servicio
    this.count = (await this.specieService.getAll()).count;
  }

  // Variable para almacenar la información de la especie
  specieInfo!: speciesRes;

  // Parámetros para la sección del encabezado
  id: number = 0; // ID de la especie
  count: number = 0; // Conteo total de especies
  name: string = ''; // Nombre de la especie

  // Parámetros para las secciones de detalles
  peoples: string[] = []; // Lista de personas asociadas a la especie
  films: string[] = []; // Lista de películas asociadas a la especie
  created: string = ''; // Fecha de creación de la especie
  edited: string = ''; // Fecha de última edición de la especie

  // Método para obtener la información de una especie específica
  async obtener(idP: number = 0) {
    // Obtiene los parámetros de la ruta activa
    const params = await firstValueFrom(this.route.params);
    // Establece el ID de la especie, ya sea el proporcionado o el de los parámetros de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Llama al servicio para obtener la información de la especie por su ID
    this.specieInfo = await this.specieService.getOne(this.id);
    // Navega a la ruta de la especie utilizando su ID
    this.router.navigate(['specie', this.id]);

    // Asigna los valores obtenidos a las variables correspondientes
    this.name = this.specieInfo.name; // Nombre de la especie
    this.peoples = this.specieInfo.people; // Personas asociadas a la especie
    // console.log(this.peoples); // Imprime la lista de personas en la consola
    this.films = this.specieInfo.films; // Películas asociadas a la especie
    this.created = this.specieInfo.created; // Fecha de creación
    this.edited = this.specieInfo.edited; // Fecha de edición
  }
}
