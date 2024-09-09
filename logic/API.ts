/*
 * Llamar a una API es una de las tareas más comunes en programación.
 *
 * Implementa una llamada HTTP a una API (la que tú quieras) y muestra su
 * resultado a través de la terminal. Por ejemplo: Pokémon, Marvel...
 *
 * Aquí tienes un listado de posibles APIs:
 * https://github.com/public-apis/public-apis
 *
 * Se ha escogido: https://api.chucknorris.io/
 */

const Url = "https://api.chucknorris.io/jokes/random";

const llamarAPI = async () => {
  try {
    // Realiza la solicitud HTTP a la URL usando fetch
    const res = await fetch(Url);

    // Convierte la respuesta en un objeto JSON.
    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log(`Error al llamar la API: ${error}`);
  }
};

llamarAPI();
