import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { AsientosComponent } from './asientos/asientos.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    AsientosComponent,
    MatTooltipModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  // Usa ViewChild para obtener acceso a AsientosComponent
  @ViewChild(AsientosComponent) asientosComponent!: AsientosComponent;

  removeReservations() {
    localStorage.removeItem('asientos'); // Limpia los datos almacenados
    this.asientosComponent.createMatriz(); // Llamamos a createMatriz del componente hijo
  }
}
