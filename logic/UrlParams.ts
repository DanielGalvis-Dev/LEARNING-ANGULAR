// URL de ejemplo con múltiples parámetros
const Url =
  "https://www.bing.com/search?pglt=675&q=DanielGalvis-Dev&cvid=76944968de294816ab6531c44bd7e0d1&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhBMgYIAhBFGDwyBggDEEUYPNIBCDk1NThqMGoxqAIIsAIB&FORM=ANNTA1&PC=EDBBAN";

// Función que extrae los valores de los parámetros de la URL
const searchParams = (url: string) => {
  // Separa la URL en dos partes: la parte antes del "?" y la parte con los parámetros
  const dividirUrl = url.split("?");

  // Si hay parámetros, divide la segunda parte (la de los parámetros) en pares "clave=valor" usando "&"
  const params = dividirUrl[1].split("&");

  // Array donde se almacenarán los valores de los parámetros
  let valuesParams: string[] = [];

  // Itera sobre cada parámetro en la lista
  params.forEach((param) => {
    // Divide cada parámetro en clave y valor usando el "=" como separador
    const [key, value] = param.split("=");

    // Agrega el valor (parte después del "=") al array de valores
    valuesParams.push(value);
  });

  // Muestra en consola el array con los valores de los parámetros
  console.log(valuesParams);
};

// Llama a la función para extraer los parámetros de la URL dada
searchParams(Url);
