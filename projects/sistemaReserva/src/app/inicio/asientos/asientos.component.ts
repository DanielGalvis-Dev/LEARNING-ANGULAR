import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [NgClass, MatTooltipModule, MatIconModule],
  templateUrl: './asientos.component.html',
  styleUrl: './asientos.component.css',
})
export class AsientosComponent implements OnInit {
  // Matriz que representa el estado de los asientos (true = reservado, false = disponible)
  asientos: boolean[][] = [];

  // Variable que indica el estado por defecto de un asiento (false = no ocupado)
  ocupado = false;

  // Almacena los asientos guardados en localStorage
  asientosGuardados: string | null = null;

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Intenta recuperar los asientos guardados desde el localStorage
    this.asientosGuardados = localStorage.getItem('asientos');
    this.cargarAsientos(); // Carga los asientos guardados o crea una nueva matriz de asientos
    // this.createMatriz(); // Esta línea está comentada porque la carga de asientos se realiza en cargarAsientos
  }

  // Carga los asientos desde localStorage si existen, si no, crea una nueva matriz de asientos
  cargarAsientos() {
    if (this.asientosGuardados) {
      // Si hay asientos guardados en localStorage, los convierte de JSON a matriz y los asigna a this.asientos
      this.asientos = JSON.parse(this.asientosGuardados);
    } else {
      // Si no hay asientos guardados, se crea una nueva matriz de 10x10 con todos los asientos disponibles
      this.createMatriz();
    }
  }

  // Crea una matriz de 10x10 donde cada asiento tiene el estado de 'ocupado' (inicialmente false)
  createMatriz() {
    this.asientos = Array.from({ length: 10 }, () =>
      Array(10).fill(this.ocupado)
    );
  }

  // Método para reservar un asiento en la posición [row][col]
  reservarAsiento(row: number, col: number) {
    // Verifica si los índices row y col están dentro del rango de la matriz
    if (
      row >= 0 &&
      row < this.asientos.length &&
      col >= 0 &&
      col < this.asientos[row].length
    ) {
      // Si el asiento está desocupado (false), lo marca como reservado (true)
      if (this.asientos[row][col] === this.ocupado) {
        this.asientos[row][col] = true;
        this.guardarAsientos(); // Guarda el estado actualizado de los asientos en localStorage
      } else {
        // Si el asiento ya está ocupado, muestra un mensaje de confirmación para liberar el asiento
        let res = confirm(
          'El asiento se encuentra ocupado, desea eliminar esta reserva?'
        );
        if (res) {
          // Si el usuario confirma, se libera el asiento volviendo a marcarlo como desocupado (false)
          this.asientos[row][col] = this.ocupado;
        }
      }
    } else {
      // Si los índices están fuera de rango, muestra un error en la consola
      console.error('Índices fuera de rango');
    }
  }

  // Guarda el estado actual de los asientos en el localStorage
  guardarAsientos() {
    localStorage.setItem('asientos', JSON.stringify(this.asientos));
  }
}
