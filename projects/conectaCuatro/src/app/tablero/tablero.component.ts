import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { tablero } from '../model/tablero';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [MatCardModule, NgClass, MatButtonModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css',
})
export class TableroComponent implements OnInit {
  // Declaración del tablero como un array de arrays de objetos 'tablero'.
  tablero: tablero[][] = [];

  // Objeto que contiene los nombres de los jugadores.
  turns = {
    X: 'PLAYER 1', // Turno del Jugador 1
    Y: 'PLAYER 2', // Turno del Jugador 2
  };

  // Turno actual, inicializado como el turno del Jugador 1.
  turn = this.turns.X;

  // Variable que guarda el jugador ganador.
  isWinner = '';

  // Función que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.genTablero(); // Genera el tablero al iniciar
  }

  // Función que genera el tablero con 6 filas y 7 columnas.
  genTablero() {
    let idCounter = 1; // Contador para generar IDs únicos para cada celda
    // Crea una matriz de 6x7 donde cada celda es un objeto con propiedades: id, isBusy, color, player.
    this.tablero = Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => {
        return {
          id: idCounter++, // Asigna un ID único y luego lo incrementa
          isBusy: false, // Indica si la celda está ocupada o no
          player: '', // Jugador que ocupa la celda
        };
      })
    );
  }

  // Cambia el turno entre los jugadores PLAYER 1 y PLAYER 2.
  changeTurn() {
    // Si el turno actual es del Jugador 1, cambia al Jugador 2, y viceversa.
    this.turn = this.turn === this.turns.X ? this.turns.Y : this.turns.X;
  }

  // Función que se ejecuta cuando un jugador ocupa una celda.
  ocuppy(col: number) {
    // Recorre las filas de abajo hacia arriba para encontrar la primera celda vacía en la columna seleccionada.
    for (let row = this.tablero.length - 1; row >= 0; row--) {
      if (!this.tablero[row][col].isBusy) {
        // Si la celda no está ocupada:
        this.tablero[row][col].isBusy = true; // Marca la celda como ocupada.
        this.tablero[row][col].player = this.turn; // Asigna el jugador actual a la celda.
        this.changeTurn(); // Cambia el turno al siguiente jugador.
        break; // Sale del bucle una vez que ha encontrado y ocupado la celda.
      }
    }
    this.checkWinnerInCols(); // Comprueba si hay un ganador en las columnas.
    this.checkWinnerInRows(); // Comprueba si hay un ganador en las filas.
    this.checkWinnerInDiagonals(); // Comprueba si hay un ganador en las diagonales.
    this.endGame(); // Verifica si el juego ha terminado (ganador o tablero lleno).
  }

  // Función que verifica si hay 4 fichas consecutivas del mismo jugador en alguna fila.
  checkWinnerInRows() {
    // Recorre cada fila del tablero.
    for (let row = 0; row < this.tablero.length; row++) {
      // Recorre las columnas de cada fila, pero solo hasta el índice 3 (para comparar grupos de 4).
      for (let col = 0; col <= this.tablero[row].length - 4; col++) {
        // Verifica si las 4 celdas consecutivas tienen el mismo jugador.
        if (
          this.tablero[row][col].player !== '' && // Asegúrate de que no esté vacío
          this.tablero[row][col].player === this.tablero[row][col + 1].player &&
          this.tablero[row][col].player === this.tablero[row][col + 2].player &&
          this.tablero[row][col].player === this.tablero[row][col + 3].player
        ) {
          this.isWinner = this.tablero[row][col].player; // Asigna al ganador.
        }
      }
    }
  }

  // Función que verifica si hay 4 fichas consecutivas del mismo jugador en alguna columna.
  checkWinnerInCols() {
    // Recorre las columnas del tablero.
    for (let col = 0; col < this.tablero[0].length; col++) {
      // Recorre las filas del tablero, pero solo hasta la fila que permite revisar 4 celdas hacia abajo.
      for (let row = 0; row <= this.tablero.length - 4; row++) {
        // Verifica si las 4 celdas consecutivas hacia abajo en la misma columna tienen el mismo jugador.
        if (
          this.tablero[row][col].player !== '' && // Asegúrate de que no esté vacío
          this.tablero[row][col].player === this.tablero[row + 1][col].player &&
          this.tablero[row][col].player === this.tablero[row + 2][col].player &&
          this.tablero[row][col].player === this.tablero[row + 3][col].player
        ) {
          this.isWinner = this.tablero[row][col].player; // Asigna al ganador si encuentra 4 consecutivos iguales.
        }
      }
    }
  }

  // Función que verifica si hay 4 fichas consecutivas del mismo jugador en alguna diagonal.
  checkWinnerInDiagonals() {
    // Recorre el tablero para verificar diagonales principales (de izquierda a derecha)
    for (let row = 0; row <= this.tablero.length - 4; row++) {
      for (let col = 0; col <= this.tablero[row].length - 4; col++) {
        // Verifica si las 4 celdas consecutivas en la diagonal principal tienen el mismo jugador
        if (
          this.tablero[row][col].player !== '' && // Asegúrate de que no esté vacío
          this.tablero[row][col].player ===
            this.tablero[row + 1][col + 1].player &&
          this.tablero[row][col].player ===
            this.tablero[row + 2][col + 2].player &&
          this.tablero[row][col].player ===
            this.tablero[row + 3][col + 3].player
        ) {
          this.isWinner = this.tablero[row][col].player; // Asigna al ganador
          return; // Sale al encontrar un ganador
        }
      }
    }

    // Recorre el tablero para verificar diagonales secundarias (de derecha a izquierda)
    for (let row = 0; row <= this.tablero.length - 4; row++) {
      for (let col = 3; col < this.tablero[row].length; col++) {
        // Verifica si las 4 celdas consecutivas en la diagonal secundaria tienen el mismo jugador
        if (
          this.tablero[row][col].player !== '' && // Asegúrate de que no esté vacío
          this.tablero[row][col].player ===
            this.tablero[row + 1][col - 1].player &&
          this.tablero[row][col].player ===
            this.tablero[row + 2][col - 2].player &&
          this.tablero[row][col].player ===
            this.tablero[row + 3][col - 3].player
        ) {
          this.isWinner = this.tablero[row][col].player; // Asigna al ganador
          return; // Sale al encontrar un ganador
        }
      }
    }
  }

  // Función que reinicia el juego y limpia el tablero.
  restarGame() {
    this.genTablero(); // Genera un nuevo tablero.
    this.isWinner = ''; // Reinicia la variable del ganador.
    this.turn = this.turns.X; // Reinicia el turno al Jugador 1.
  }

  // Función que verifica si el juego ha terminado.
  endGame() {
    // Comprueba si todas las celdas del tablero están ocupadas.
    const allBusy = this.tablero.every(
      (row) => row.every((col) => col.isBusy === true) // Verifica si cada celda en cada fila está ocupada.
    );

    // Si todas las celdas están ocupadas o hay un ganador, muestra un mensaje de fin de juego.
    if (allBusy || this.isWinner !== '') {
      // Determina el mensaje basado en si el tablero está lleno o hay un ganador.
      let condition = allBusy
        ? 'NO QUEDAN MAS MOVIMIENTOS' // Mensaje para empate.
        : `EL GANADOR ES ${this.isWinner}`; // Mensaje para un ganador.

      alert(`FIN DEL JUEGO, ${condition}`); // Muestra una alerta con el mensaje de fin de juego.

      // Si quisieras reiniciar automáticamente, podrías descomentar el código a continuación:
      // const res = confirm(`FIN DEL JUEGO, ${condition} , DESEA INICIAR UNA NUEVA PARTIDA?`);
      // if (res) {
      //   this.restarGame();  // Reinicia el juego si el usuario lo desea.
      // }
    }
  }
}
