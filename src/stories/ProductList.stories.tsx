import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from '../components/ProductList';

const meta: Meta<typeof ProductList> = {
  title: 'Components/ProductList',
  component: ProductList,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProductList>;

const mockProducts = [
  {
    id: 1,
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones',
    price: 249.99,
    createdAt: new Date()
  }
];

export const Default: Story = {
  args: {
    products: mockProducts,
    selectedProduct: null,
    onSelect: (product) => console.log('Selected:', product),
    onDelete: (id) => console.log('Deleted:', id)
  }
};

export const WithSelectedProduct: Story = {
  args: {
    ...Default.args,
    selectedProduct: mockProducts[0]
  }
};