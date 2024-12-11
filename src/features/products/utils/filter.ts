import { Product } from '../types';

export const filterProducts = (products: Product[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description?.toLowerCase().includes(term)
  );
};