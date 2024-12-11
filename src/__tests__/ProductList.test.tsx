import { render, fireEvent, screen } from '@testing-library/react';
import { ProductList } from '../components/ProductList';

const mockProducts = [
  {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    createdAt: new Date()
  }
];

describe('ProductList', () => {
  it('renders products correctly', () => {
    render(
      <ProductList
        products={mockProducts}
        selectedProduct={null}
        onSelect={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('calls onSelect when product is clicked', () => {
    const onSelect = jest.fn();
    render(
      <ProductList
        products={mockProducts}
        selectedProduct={null}
        onSelect={onSelect}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Test Product'));
    expect(onSelect).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(
      <ProductList
        products={mockProducts}
        selectedProduct={null}
        onSelect={() => {}}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});