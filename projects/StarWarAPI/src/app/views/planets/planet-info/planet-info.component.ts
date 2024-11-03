import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { planetsRes } from '../../../models/planets.model';
import { PlanetsService } from '../../../services/planets.service';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { PlanetBasicInfoComponent } from './planet-basic-info/planet-basic-info.component';
import { PeoplesSectionComponent } from '../../../layouts/sections/peoples-section/peoples-section.component';
import { FilmsSectionComponent } from '../../../layouts/sections/films-section/films-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-planet-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    PlanetBasicInfoComponent,
    PeoplesSectionComponent,
    FilmsSectionComponent,
    DatesSectionComponent,
    NgClass,
  ],
  templateUrl: './planet-info.component.html',
  styleUrl: './planet-info.component.css',
})
export class PlanetInfoComponent implements OnInit {
  // Importamos el servicio PlanetsService para manejar la lógica relacionada con los planetas
  private planetService = inject(PlanetsService);

  // Iniciamos el constructor con Router y ActivatedRoute para la navegación y acceso a parámetros de ruta
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    // Llama a la función obtener para cargar la información del planeta
    this.obtener();
    // Obtiene el conteo total de planetas a través del servicio y lo asigna a la variable count
    this.count = (await this.planetService.getAll()).count;
  }

  // Variable para almacenar la información del planeta
  planetInfo!: planetsRes;

  // Parámetros para la cabecera de la sección
  id: number = 0; // ID del planeta
  count: number = 0; // Conteo total de planetas
  name: string = ''; // Nombre del planeta

  // Parámetros para las secciones relacionadas con el planeta
  peoples: string[] = []; // Lista de residentes del planeta
  films: string[] = []; // Lista de películas en las que aparece el planeta
  created: string = ''; // Fecha de creación del planeta
  edited: string = ''; // Fecha de la última edición del planeta

  // Variable para modificar la posición de las secciones
  isSmall: boolean = false;

  // Método para obtener la información de un planeta específico
  async obtener(idP: number = 0) {
    // Espera a que se resuelvan los parámetros de la ruta
    const params = await firstValueFrom(this.route.params);
    // Asigna el ID del planeta, ya sea el proporcionado o el extraído de los parámetros de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Obtiene la información del planeta a través del servicio utilizando el ID
    this.planetInfo = await this.planetService.getOne(this.id);
    // Navega a la ruta del planeta usando el ID
    this.router.navigate(['planet', this.id]);

    // Asigna la información del planeta a las variables correspondientes
    this.name = this.planetInfo.name;
    this.peoples = this.planetInfo.residents;
    this.films = this.planetInfo.films;
    this.created = this.planetInfo.created;
    this.edited = this.planetInfo.edited;

    this.isSmall = this.peoples.length < 4 ? true : false;
  }
}
