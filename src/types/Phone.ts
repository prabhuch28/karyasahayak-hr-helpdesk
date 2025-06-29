export interface Phone {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  specifications: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    os: string;
  };
  features: string[];
  rating: number;
  reviews: number;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface SearchFilters {
  phoneType: string;
  brand: string;
  priceRange: string;
  minRating?: number;
}