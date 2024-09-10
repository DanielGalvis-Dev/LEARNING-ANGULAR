/*
 * Crea una función que sea capaz de transformar Español al lenguaje básico 
 * del universo Star Wars: el "Aurebesh".
 * - Puedes dejar sin transformar los caracteres que no existan en "Aurebesh".
 * - También tiene que ser capaz de traducir en sentido contrario.
 *  

 *
 * ¡Que la fuerza os acompañe!
 */

const dictSpanishToAurebesh = {
  A: "Aa",
  B: "Besh",
  C: "Cresh",
  D: "Dorn",
  E: "Een",
  F: "Forn",
  G: "Gree",
  H: "Herf",
  I: "Isk",
  J: "Jenth",
  K: "Krill",
  L: "Leth",
  M: "Mando",
  N: "Nern",
  Ñ: "Ñ",
  O: "Osk",
  P: "Pei",
  Q: "Qek",
  R: "Resh",
  S: "Senth",
  T: "Trill",
  U: "Usk",
  V: "Vev",
  W: "Wesk",
  X: "Xesh",
  Y: "Yirt",
  Z: "Zerek",
};

const dictAurebeshToSpanish = {
  AA: "A",
  BESH: "B",
  CRESH: "C",
  DORN: "D",
  EEN: "E",
  FORN: "F",
  GREE: "G",
  HERF: "H",
  ISK: "I",
  JENTH: "J",
  KRILL: "K",
  LETH: "L",
  MANDO: "M",
  NERN: "N",
  Ñ: "Ñ",
  OSK: "O",
  PEI: "P",
  QEK: "Q",
  RESH: "R",
  SENTH: "S",
  TRILL: "T",
  USK: "U",
  VEV: "V",
  WESK: "W",
  XESH: "X",
  YIRT: "Y",
  ZEREK: "Z",
};

// Función que traduce un texto según un diccionario de traducción.
// Para utilizarla debo colocar una palabara en español y
// si va a colocar una frase no puede llevar espacios.
// Parámetros:
// - text: El texto que se desea traducir.
// - language: Un objeto de tipo Record, que funciona como un diccionario clave-valor para la traducción.
const translator = (text: string, language: Record<string, string>) => {
  // Verifica si el texto contiene espacios para determinar si es una palabra o una secuencia de caracteres
  let divideWor = text.includes(" ") ? text.split(" ") : text.split("");

  // Recorre cada palabra o carácter, traduciéndolo si existe en el diccionario, o lo deja igual si no se encuentra
  const search = divideWor.map((char) => language[char.toUpperCase()] || char);

  // Si el texto original tiene espacios, los elimina al unir, si no, los agrega entre caracteres traducidos
  const uniteWor = text.includes(" ") ? search.join(" ") : search.join("");

  // Muestra el texto traducido
  console.log(uniteWor);
};

// Ejemplo de uso con el diccionario `dictAurebeshToSpanish`
translator("HelloWorld", dictSpanishToAurebesh);
