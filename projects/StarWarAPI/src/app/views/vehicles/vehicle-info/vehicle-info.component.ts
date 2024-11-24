import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderComponent } from '../../../layouts/headers/card-header/card-header.component';
import { VehicleBasicInfoComponent } from './vehicle-basic-info/vehicle-basic-info.component';
import { PeoplesSectionComponent } from '../../../layouts/sections/peoples-section/peoples-section.component';
import { FilmsSectionComponent } from '../../../layouts/sections/films-section/films-section.component';
import { DatesSectionComponent } from '../../../layouts/sections/dates-section/dates-section.component';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { vehiclesRes } from '../../../models/vehicles.model';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [
    MatCardModule,
    CardHeaderComponent,
    VehicleBasicInfoComponent,
    PeoplesSectionComponent,
    FilmsSectionComponent,
    DatesSectionComponent,
  ],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.css',
})
export class VehicleInfoComponent implements OnInit {
  // Inyecta el servicio de vehículos para su uso en esta clase
  private vehicleService = inject(VehiclesService);

  // Constructor que inyecta el enrutador y la ruta activada
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit(): Promise<void> {
    // Llama al método obtener para cargar la información del vehículo
    this.obtener();
    // Obtiene el conteo total de vehículos desde el servicio
    this.count = (await this.vehicleService.getAll()).count;
  }

  // Variable para almacenar la información del vehículo
  vehicleInfo!: vehiclesRes;

  // Parámetros de la sección de encabezado
  id: number = 0; // ID del vehículo
  count: number = 0; // Conteo de vehículos
  name: string = ''; // Nombre del vehículo

  // Parámetros de las secciones relacionadas con el vehículo
  peoples: string[] = []; // Pilotos del vehículo
  films: string[] = []; // Películas en las que aparece el vehículo
  created: string = ''; // Fecha de creación del vehículo
  edited: string = ''; // Fecha de edición del vehículo

  // Método asíncrono para obtener información del vehículo
  async obtener(idP: number = 0) {
    // Espera a que se resuelvan los parámetros de la ruta
    const params = await firstValueFrom(this.route.params);
    // Establece el ID del vehículo, ya sea el proporcionado o el obtenido de los parámetros de la ruta
    this.id = idP === 0 ? parseInt(params['id']) : idP;

    // Obtiene la información del vehículo utilizando el servicio
    this.vehicleInfo = await this.vehicleService.getById(this.id);
    // Navega a la ruta del vehículo específico
    this.router.navigate(['vehicle', this.id]);

    // Asigna los valores obtenidos a las variables correspondientes
    this.name = this.vehicleInfo.name; // Nombre del vehículo
    this.peoples = this.vehicleInfo.pilots; // Pilotos del vehículo
    // console.log(this.peoples)
    this.films = this.vehicleInfo.films; // Películas en las que aparece el vehículo
    this.created = this.vehicleInfo.created; // Fecha de creación
    this.edited = this.vehicleInfo.edited; // Fecha de edición
  }
}
