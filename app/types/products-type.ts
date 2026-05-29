export interface ProductRating {
  count: number;
  rate: number;
}

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: ProductRating;
  title: string;
}
