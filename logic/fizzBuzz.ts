/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 */

// Definición de constantes para los múltiplos y el rango de números a procesar
const fizz = 3; // Múltiplo para reemplazar con "fizz"
const buzz = 5; // Múltiplo para reemplazar con "buzz"
const range = 100; // Rango máximo de números (1 a 100)

// Función que imprime números del 1 al rango especificado, reemplazando los múltiplos
// de 3, 5 y ambos con las palabras correspondientes
const fizzBuzz = (fizz: number, buzz: number, range: number) => {
  // Itera desde 1 hasta el valor del rango (incluyendo)
  for (let i = 0; i <= range; i++) {
    let x: any = i; // Inicializa la variable de salida con el número actual
    // Reemplaza el número con "fizzbuzz" si es múltiplo de ambos fizz y buzz
    if (x % fizz === 0 && x % buzz === 0) x = "fizzbuzz";
    // Reemplaza el número con "fizz" si es múltiplo de fizz
    if (x % fizz === 0) x = "fizz";
    // Reemplaza el número con "buzz" si es múltiplo de buzz
    if (x % buzz === 0) x = "buzz";
    // Imprime el resultado en la consola
    console.log(x);
  }
};

// Llama a la función fizzBuzz con los parámetros definidos
fizzBuzz(fizz, buzz, range);
