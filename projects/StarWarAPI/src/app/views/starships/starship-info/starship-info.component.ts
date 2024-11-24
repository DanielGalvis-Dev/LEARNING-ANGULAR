import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { starshipsRes } from '../../../models/starships.model';
import { StarshipsService } from '../../../services/starships.service';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { StarshipBasicInfoComponent } from './starship-basic-info/starship-basic-info.component';
import { PeoplesSectionComponent } from '../../../layouts/sections/peoples-section/peoples-section.component';
import { FilmsSectionComponent } from '../../../layouts/sections/films-section/films-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';

@Component({
  selector: 'app-starship-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    StarshipBasicInfoComponent,
    PeoplesSectionComponent,
    FilmsSectionComponent,
    DatesSectionComponent,
  ],
  templateUrl: './starship-info.component.html',
  styleUrl: './starship-info.component.css',
})
export class StarshipInfoComponent implements OnInit {
  // Inyectamos el servicio de starships para poder utilizar sus métodos
  private starshipService = inject(StarshipsService);

  // Constructor que inyecta el enrutador y la ruta activada
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    // Llamamos al método obtener para cargar la información inicial
    this.obtener();

    // Obtenemos el total de naves estelares disponibles
    this.count = (await this.starshipService.getAll()).count;
  }

  // Variable que almacenará la información de la nave estelar
  starshipInfo!: starshipsRes;

  // Parámetros para la sección de encabezado
  id: number = 0; // ID de la nave estelar
  count: number = 0; // Conteo total de naves estelares
  name: string = ''; // Nombre de la nave estelar

  // Parámetros para las secciones de detalles
  peoples: string[] = []; // Lista de pilotos de la nave
  films: string[] = []; // Lista de películas en las que aparece la nave
  created: string = ''; // Fecha de creación de la nave
  edited: string = ''; // Fecha de última edición de la nave

  // Método para obtener información de una nave estelar
  async obtener(idP: number = 0) {
    // Obtenemos los parámetros de la ruta activada
    const params = await firstValueFrom(this.route.params);

    // Si no se proporciona un ID, lo extraemos de los parámetros de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Obtenemos la información de la nave estelar utilizando el ID
    this.starshipInfo = await this.starshipService.getById(this.id);

    // Navegamos a la ruta de la nave estelar
    this.router.navigate(['starship', this.id]);

    // Asignamos los valores obtenidos a las variables correspondientes
    this.name = this.starshipInfo.name;
    this.peoples = this.starshipInfo.pilots;
    this.films = this.starshipInfo.films;
    this.created = this.starshipInfo.created;
    this.edited = this.starshipInfo.edited;
  }
}
