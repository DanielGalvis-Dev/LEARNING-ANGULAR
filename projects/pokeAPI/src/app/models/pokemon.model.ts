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
  types: [];
  weight: number;
}

export interface abilities {
  ability: ability;
  is_hidden: boolean;
  slot: number;
}

export interface ability {
  name: string;
  url: string;
}
