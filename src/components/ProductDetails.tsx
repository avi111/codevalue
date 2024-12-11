import React from 'react';
import { Card, CardContent, TextField, Button, Stack } from '@mui/material';
import { Product, ProductFormData } from '../types/product';
import { useForm } from '../hooks/useForm';

interface ProductDetailsProps {
  product: Product | null;
  onSave: (id: number | null, data: ProductFormData) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onSave }) => {
  const { values, errors, handleChange, isValid, resetForm } = useForm<ProductFormData>({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0
    },
    validate: (values) => {
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
    }
  });

  React.useEffect(() => {
    if (product) {
      resetForm({
        name: product.name,
        description: product.description || '',
        price: product.price
      });
    }
  }, [product, resetForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSave(product?.id || null, values);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              Save
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};