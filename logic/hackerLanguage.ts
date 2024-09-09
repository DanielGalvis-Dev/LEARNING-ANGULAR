/*
 * Escribe un programa que reciba un texto y transforme lenguaje natural a
 * "lenguaje hacker" (conocido realmente como "leet" o "1337"). Este lenguaje
 * se caracteriza por sustituir caracteres alfanuméricos.
 * - Utiliza esta tabla (https://www.gamehouse.com/blog/leet-speak-cheat-sheet/)
 * con el alfabeto y los números en "leet".
 * (Usa la primera opción de cada transformación. Por ejemplo "4" para la "a")
 */

// Definición de una tabla de mapeo que traduce caracteres del alfabeto y números a su equivalente en "leet speak".
const leetTable = {
  A: "4", // La letra 'A' se traduce como '4'
  B: "I3", // La letra 'B' se traduce como 'I3'
  C: "[", // La letra 'C' se traduce como '['
  D: ")", // La letra 'D' se traduce como ')'
  E: "3", // La letra 'E' se traduce como '3'
  F: "|=", // La letra 'F' se traduce como '|='
  G: "&", // La letra 'G' se traduce como '&'
  H: "#", // La letra 'H' se traduce como '#'
  I: "1", // La letra 'I' se traduce como '1'
  J: ",_|", // La letra 'J' se traduce como ',_|'
  K: ">|", // La letra 'K' se traduce como '>|'
  L: "1", // La letra 'L' se traduce como '1'
  M: "//\\", // La letra 'M' se traduce como '//\\'
  N: "^/", // La letra 'N' se traduce como '^/'
  O: "0", // La letra 'O' se traduce como '0'
  P: "|*", // La letra 'P' se traduce como '|*'
  Q: "(_,)", // La letra 'Q' se traduce como '(_,'
  R: "I2", // La letra 'R' se traduce como 'I2'
  S: "5", // La letra 'S' se traduce como '5'
  T: "7", // La letra 'T' se traduce como '7'
  U: "(_)", // La letra 'U' se traduce como '(_)'
  V: "/", // La letra 'V' se traduce como '/'
  W: "//", // La letra 'W' se traduce como '//'
  X: "><", // La letra 'X' se traduce como '><'
  Y: "`/", // La letra 'Y' se traduce como '`/'
  Z: "2", // La letra 'Z' se traduce como '2'
  1: "L", // El número '1' se traduce como 'L'
  2: "R", // El número '2' se traduce como 'R'
  3: "E", // El número '3' se traduce como 'E'
  4: "A", // El número '4' se traduce como 'A'
  5: "S", // El número '5' se traduce como 'S'
  6: "b", // El número '6' se traduce como 'b'
  7: "T", // El número '7' se traduce como 'T'
  8: "B", // El número '8' se traduce como 'B'
  9: "g", // El número '9' se traduce como 'g'
  0: "o", // El número '0' se traduce como 'o'
};

/**
 * Función que traduce un texto a "leet speak" usando la tabla de mapeo leetTable.
 *
 * @param {string} text - Cadena de texto que se va a traducir. Por defecto es una cadena vacía.
 * @param {Record<string, string>} leetTable - Tabla de mapeo que define cómo se traducen los caracteres al leet speak.
 * @return {string} Una cadena de texto traducida a "leet speak".
 */

const leetTranslate = (
  text: string = "", // El texto a traducir
  leetTable: Record<string, string> // La tabla de mapeo de leet speak
): string =>
  text
    .split("") // Divide el texto en un array de caracteres individuales
    .map((char) => leetTable[char.toUpperCase()] || char)
    // "char" Mapea cada carácter al equivalente en leet speak y
    // usa el carácter en mayúsculas si existe en la tabla,
    // si no, deja el carácter original
    .join(""); // Une los caracteres traducidos en una sola cadena de texto

console.log(leetTranslate("HelloWorld", leetTable));
