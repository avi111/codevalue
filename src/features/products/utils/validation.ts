import { ProductFormData } from '../types';

export const validateProduct = (values: ProductFormData) => {
  const errors: Partial<Record<keyof ProductFormData, string>> = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length > 30) {
    errors.name = 'Name must be less than 30 characters';
  }
  
  if (values.description && values.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }
  
  if (!values.price || values.price <= 0) {
    errors.price = 'Price must be greater than zero';
  }
  
  return errors;
};