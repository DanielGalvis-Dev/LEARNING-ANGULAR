export interface planets {
  count: number;
  next: string | null;
  previous: string | null;
  results: planetsRes[];
}

export interface planetsRes {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
