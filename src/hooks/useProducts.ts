import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../types/product';
import { loadProducts, saveProducts } from '../utils/storage';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const stored = loadProducts();
    if (stored.length === 0) {
      // Initialize with sample data
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

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
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