export interface vehicles {
  count: number;
  next: string;
  previous: null | string;
  results: vehiclesResults[];
}

export interface vehiclesResults {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  vehicle_class: string;
  pilots: [];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FoodNode {
  name: string;
  children?: FoodNode[];
}
