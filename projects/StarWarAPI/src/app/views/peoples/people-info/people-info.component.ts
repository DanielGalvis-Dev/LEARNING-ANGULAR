import { Component, inject, OnInit } from '@angular/core';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PeoplesService } from '../../../services/peoples.service';
import { peoplesRes } from '../../../models/peoples.model';
import { FilmsSectionComponent } from '../../../layouts/sections/films-section/films-section.component';
import { VehiclesSectionComponent } from '../../../layouts/sections/vehicles-section/vehicles-section.component';
import { StarshipsSectionComponent } from '../../../layouts/sections/starships-section/starships-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';
import { PeopleBasicInfoComponent } from './people-basic-info/people-basic-info.component';

@Component({
  selector: 'app-people-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    PeopleBasicInfoComponent,
    FilmsSectionComponent,
    VehiclesSectionComponent,
    StarshipsSectionComponent,
    DatesSectionComponent,
  ],
  templateUrl: './people-info.component.html',
  styleUrl: './people-info.component.css',
})
export class PeopleInfoComponent implements OnInit {
  // Inyección del servicio de personas
  private peopleService = inject(PeoplesService);

  // Constructor que inyecta el router y la ruta activada
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    // Llama al método obtener para cargar la información del personaje
    this.obtener();

    // Obtiene el conteo total de personas desde el servicio y lo asigna a la variable count
    this.count = (await this.peopleService.getAll()).count;
  }

  // Variable para almacenar la información del personaje
  peopleInfo!: peoplesRes;

  // Parámetros para la sección de encabezado
  id: number = 0; // ID del personaje
  count: number = 0; // Conteo total de personajes
  name: string = ''; // Nombre del personaje

  // Parámetros para las secciones adicionales
  films: string[] = []; // Lista de películas en las que aparece el personaje
  vehicles: string[] = []; // Lista de vehículos asociados al personaje
  starships: string[] = []; // Lista de naves estelares asociadas al personaje
  created: string = ''; // Fecha de creación del personaje
  edited: string = ''; // Fecha de la última edición del personaje

  // Método para obtener la información del personaje
  async obtener(idP: number = 0) {
    // Obtiene los parámetros de la ruta activa
    const params = await firstValueFrom(this.route.params);

    // Asigna el ID del personaje, si no se proporciona uno, se obtiene del parámetro de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Llama al servicio para obtener la información del personaje por su ID
    this.peopleInfo = await this.peopleService.getById(this.id);

    // Navega a la ruta del personaje usando su ID
    this.router.navigate(['people', this.id]);

    // Asigna la información del personaje a las variables correspondientes
    this.name = this.peopleInfo.name;
    this.films = this.peopleInfo.films;
    this.vehicles = this.peopleInfo.vehicles;
    this.starships = this.peopleInfo.starships;
    this.created = this.peopleInfo.created;
    this.edited = this.peopleInfo.edited;
  }
}
