import { Product } from '../types';
import { STORAGE_KEY } from '../constants';

export const loadProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const products: Product[] = JSON.parse(stored);
    return products.map((p) => ({
      ...p,
      createdAt: new Date(p.createdAt)
    }));
  } catch {
    return [];
  }
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};