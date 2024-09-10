/*
 * Crea una función que sea capaz de detectar si existe un viernes 13
 * en el mes y el año indicados.
 * - La función recibirá el mes y el año y retornará verdadero o falso.
 */

// Arreglo que contiene los números de los meses del año (1 = Enero, 2 = Febrero, ..., 12 = Diciembre)
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Función que busca y muestra todas las fechas que caen un viernes 13 en un año dado
// 'months' es el arreglo de meses, 'year' es el año en el que se buscan los viernes 13
const friday13 = (months: number[], year: number) => {
  // Recorre cada mes en el arreglo de meses
  months.forEach((month) => {
    // Crea un objeto Date para el día 13 de cada mes
    const date = new Date(year, month, 13);

    // Verifica si el día de la semana para esta fecha es viernes (5 = Viernes en JavaScript)
    const search = date.getDay() === 5;

    // Si el día 13 cae en viernes, se imprime la fecha y el valor booleano de 'search'
    if (search) {
      console.log(date); // Muestra la fecha que corresponde a un viernes 13
      console.log(search); // Muestra 'true' para indicar que es un viernes 13
    }
  });
};

// Llama a la función para buscar los viernes 13 en el año 2024
friday13(MONTHS, 2024);
