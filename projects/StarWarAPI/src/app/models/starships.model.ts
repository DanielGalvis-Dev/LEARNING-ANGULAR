export interface starships {
  count: number;
  next: string | null;
  previous: string | null;
  results: starshipsRes[];
}

export interface starshipsRes {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: string;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: number;
  MGLT: number;
  starship_class: string;
  pilots: [];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
