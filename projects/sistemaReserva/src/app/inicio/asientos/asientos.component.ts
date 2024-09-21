import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './asientos.component.html',
  styleUrl: './asientos.component.css',
})
export class AsientosComponent implements OnInit {
  public asientos: boolean[][] = [];
  public ocupado = false;
  public asientosGuardados: string | null = null;

  ngOnInit(): void {
    this.asientosGuardados = localStorage.getItem('asientos'); // Mover esta línea aquí
    this.cargarAsientos(); // Corrección: Llamar la función correctamente
  }

  cargarAsientos() {
    if (this.asientosGuardados) {
      this.asientos = JSON.parse(this.asientosGuardados);
    } else {
      this.createMatriz();
    }
  }

  public createMatriz() {
    this.asientos = Array.from({ length: 10 }, () =>
      Array(10).fill(this.ocupado)
    );
  }

  reservarAsiento(i: number, j: number) {
    if (
      i >= 0 &&
      i < this.asientos.length &&
      j >= 0 &&
      j < this.asientos[i].length
    ) {
      if (this.asientos[i][j] === this.ocupado) {
        this.asientos[i][j] = true;
        this.guardarAsientos();
      } else {
        let res = confirm(
          'El asiento se encuentra ocupado, desea eliminar esta reserva?'
        );
        if (res) {
          this.asientos[i][j] = this.ocupado;
        }
      }
    } else {
      console.error('Índices fuera de rango');
    }
  }

  guardarAsientos() {
    localStorage.setItem('asientos', JSON.stringify(this.asientos));
  }

}
