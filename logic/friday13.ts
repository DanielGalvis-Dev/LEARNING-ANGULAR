/*
 * Crea una función que sea capaz de detectar si existe un viernes 13
 * en el mes y el año indicados.
 * - La función recibirá el mes y el año y retornará verdadero o falso.
 */

// --------------------------------- V1 --------------------------------- \\

// // Función que detecta si existe un viernes 13 en el mes y año indicados
// const isFriday13 = (month: number, year: number): boolean => {
//   // Crea un objeto Date para el día 13 del mes y año indicados
//   const date = new Date(year, month, 13);

//   // Verifica si el día 13 es viernes
//   return date.getDay() === 5;
// };

// console.log(isFriday13(9, 2024)); // Devuelve true si hay un viernes 13 en septiembre de 2024
// console.log(isFriday13(10, 2024)); // Devuelve false si no hay un viernes 13 en octubre de 2024

// --------------------------------- V2 --------------------------------- \\

/// Arreglo que contiene los números de los meses del año (1 = Enero, 2 = Febrero, ..., 12 = Diciembre)
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Año inicial para buscar los viernes 13
const startYear = 2021;

// Año final para buscar los viernes 13
const endYear = 2024;

/*
 * Función que busca y muestra todas las fechas que caen un viernes 13
 * en los años entre startYear y endYear (ambos inclusive).
 *
 * Parámetros:
 *  - months: Un arreglo con los números de los meses (1 - 12).
 *  - startYear: El año de inicio de la búsqueda.
 *  - endYear: El año final de la búsqueda.
 */
const friday13 = (months: number[], startYear: number, endYear: number) => {
  // Itera sobre los años desde startYear hasta endYear (inclusive)
  for (startYear; startYear <= endYear; startYear++) {
    let year = startYear; // Variable que representa el año actual en la iteración

    // Recorre cada mes del arreglo months
    months.forEach((month) => {
      // Crea un objeto Date para el día 13 del mes y año actual
      const date = new Date(year, month, 13);

      // Verifica si el día de la semana de esa fecha es viernes
      const search = date.getDay() === 5;

      // Si el día 13 cae en viernes, se imprime la fecha
      if (search) {
        console.log(date.toLocaleDateString()); // Muestra solo la fecha en formato local (sin hora)
      }
    });
  }
};

// Llama a la función para buscar los viernes 13 entre 2021 y 2024
friday13(MONTHS, startYear, endYear);
