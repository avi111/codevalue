import { Product, SortOption } from '../types';

export const sortProducts = (products: Product[], sortBy: SortOption) => {
  return [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};