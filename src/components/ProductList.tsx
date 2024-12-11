import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProduct,
  onSelect,
  onDelete
}) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} key={product.id}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              bgcolor: selectedProduct?.id === product.id ? 'action.selected' : 'background.paper'
            }}
            onClick={() => onSelect(product)}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};