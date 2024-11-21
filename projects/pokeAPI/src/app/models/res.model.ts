export interface response {
  count: number;
  next: string;
  previous: string;
  results: results[];
}

export interface results {
  name: string;
  url: string;
}
