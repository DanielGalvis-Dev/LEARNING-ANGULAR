/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 */

const fizz = 3;
const buzz = 5;
const range = 200;

const fizzBuzz = (fizz: number, buzz: number, range: number) => {
  for (let i = 0; i < range; i++) {
    let x: any = i + 1;
    if (x % fizz === 0 && x % buzz === 0) x = "fizzbuzz";
    if (x % fizz === 0) x = "fizz";
    if (x % buzz === 0) x = "buzz";
    console.log(x);
  }
};

fizzBuzz(fizz, buzz, range);
