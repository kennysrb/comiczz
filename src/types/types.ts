export interface Price {
  price: number;
}

export interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: Price[];
  dates: { type: string; date: string }[];
  format: string;
  pageCount: number;
  characters: { items: { name: string }[] };
  creators: { items: { name: string; role: string }[] };
  diamondCode: string;
}
