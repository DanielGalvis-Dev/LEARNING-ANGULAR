export interface species {
  count: number;
  next: string | null;
  previous: string | null;
  results: speciesRes[];
}

export interface speciesRes {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
