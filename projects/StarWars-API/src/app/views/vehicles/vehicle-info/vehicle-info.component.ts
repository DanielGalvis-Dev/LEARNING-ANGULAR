import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VehiclesService } from '../../../services/vehicles.service';
import { vehicles, vehiclesResults } from '../../../models/vehicles.model';
import { MatCardModule } from '@angular/material/card';
import { VehicleCardContentComponent } from "./vehicle-card-content/vehicle-card-content.component";
import { CardHeaderComponent } from "../../layouts/card-header/card-header.component";

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [MatCardModule, VehicleCardContentComponent, CardHeaderComponent],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.css',
})
export class VehicleInfoComponent {
  private vehicleService = inject(VehiclesService);
  vehiclesData: vehicles = {} as vehicles;
  vehicleInfo: vehiclesResults = {} as vehiclesResults;

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
    this.vehiclesData = await this.vehicleService.listar();
    this.count = this.vehiclesData.count;
  }

  async obtener(idP: number = 0) {
    const params = await firstValueFrom(this.route.params);
    this.id = idP === 0 ? parseInt(params['id']) : idP;
    // Obtener información del personaje
    this.vehicleInfo = await this.vehicleService.obtener(this.id);
    this.name = this.vehicleInfo.name;
    this.router.navigate(['vehicle', this.id]);
    // console.log('Info:', this.vehicleInfo);
  }
}
