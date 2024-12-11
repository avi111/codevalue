import { useState, useEffect } from 'react';
import { Product, ProductFormData, SortOption } from '../types';
import { loadProducts, saveProducts } from '../utils/storage';
import { sortProducts } from '../utils/sort';
import { filterProducts } from '../utils/filter';
import { ITEMS_PER_PAGE } from '../constants';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');

  useEffect(() => {
    const stored = loadProducts();
    if (stored.length === 0) {
      const initialProducts: Product[] = [
        {
          id: 1,
          name: "Laptop Pro",
          description: "High-performance laptop for professionals",
          price: 1299.99,
          createdAt: new Date()
        },
        {
          id: 2,
          name: "Wireless Headphones",
          description: "Premium noise-canceling headphones",
          price: 249.99,
          createdAt: new Date()
        }
      ];
      setProducts(initialProducts);
      saveProducts(initialProducts);
    } else {
      setProducts(stored);
    }
  }, []);

  const filteredAndSortedProducts = sortProducts(
    filterProducts(products, searchTerm),
    sortBy
  );

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const addProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      createdAt: new Date()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    return newProduct;
  };

  const updateProduct = (id: number, productData: ProductFormData) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, ...productData }
        : product
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  return {
    products: paginatedProducts,
    selectedProduct,
    setSelectedProduct,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    addProduct,
    updateProduct,
    deleteProduct
  };
};