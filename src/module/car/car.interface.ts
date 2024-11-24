type CarCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';

export type ICar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
