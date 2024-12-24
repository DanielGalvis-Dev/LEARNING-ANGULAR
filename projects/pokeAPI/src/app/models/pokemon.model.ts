export interface pokemon {
  abilities: abilities[];
  base_experience: number;
  cries: {};
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: true;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: {};
  sprites: {};
  stats: [];
  types: types[];
  weight: number;
}

export interface abilities {
  ability: info;
  is_hidden: boolean;
  slot: number;
}

export interface types {
  slot: number;
  type: info;
}

export interface info {
  name: string;
  url: string;
}

export interface details {
  id: number;
  types: string[];
  abilities: string[];
  weight: number;
  locations: string;
  height: number;
  state: boolean;
}
