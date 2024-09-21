const fila = 2;
const columna = 7;
const ocupado = "X";
const libre = "L";

let asientos: string[][] = [];

for (let i = 0; i < 10; i++) {
  let row: string[] = [];
  for (let j = 0; j < 10; j++) {
    row.push(libre);
  }
  asientos.push(row);
}

// Mostrar el mapa de asientos
const mostrarMapa = () => {
  for (let i = 0; i < asientos.length; i++) {
    let fila = "";
    for (let j = 0; j < asientos[i].length; j++) {
      fila += asientos[i][j] + " ";
      // console.log(fila)
    }
    console.log(`Fila ${i}: | ${fila}|`);
  }
};

const ocuparPuesto = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (asientos[fila][columna] === libre) {
        asientos[fila][columna] = ocupado;
      } else {
        console.log("El asiento se encuentra ocupado, por favor elija otro");
      }
    }
  }
};
let verMapa: string = "";
console.log("---------- SISTEMA DE RESERVA DE ASIENTOS ----------");
console.log("¿Desea ver los asientos libres?");
if (verMapa.toUpperCase() === "SI") {
  console.log(mostrarMapa());
}
console.log("selecciona una fila entre 0 y 9");
console.log("selecciona una asientot entre 0 y 9");
