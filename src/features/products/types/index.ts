export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;

export type SortOption = 'name' | 'date';