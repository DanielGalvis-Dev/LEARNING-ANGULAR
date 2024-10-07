export interface APIRes {
  count: number; // Cantidad total de personajes disponibles en la base de datos
  next: string; // URL de la siguiente página de resultados (si existe)
  previous: string | null; // URL de la página anterior (o null si no hay una página anterior)
  results: character[]; // Estructura de los objetos de cada personaje
}

// Interfaz character que representa una respuesta paginada de personajes
export interface character {
  name: string; // El nombre del personaje
  height: string | number; // La altura del personaje, puede ser un número o una cadena como "unknown"
  mass: string | number; // La masa (peso) del personaje, puede ser un número o una cadena como "unknown"
  hair_color: string; // El color de cabello del personaje
  skin_color: string; // El color de la piel del personaje
  eye_color: string; // El color de los ojos del personaje
  birth_year: string; // El año de nacimiento del personaje en formato como "19BBY" (antes de la batalla de Yavin)
  gender: string; // El género del personaje
  homeworld: string; // URL del planeta natal del personaje
  films: string[]; // Lista de URLs de películas en las que aparece el personaje
  species: string; // Lista de URLs de especies a las que pertenece el personaje
  vehicles: string[]; // Lista de URLs de vehículos que ha pilotado el personaje
  starships: string[]; // Lista de URLs de naves espaciales que ha pilotado el personaje
  created: string; // Fecha y hora en la que fue creado el registro del personaje
  edited: string; // Fecha y hora de la última modificación del registro del personaje
  url: string; // URL del recurso del personaje en la API
}
