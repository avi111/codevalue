import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Container,
  Grid,
  Box,
  Pagination,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { useProducts } from './hooks/useProducts';
import { ProductFormData } from './types/product';

function App() {
  const {
    products,
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
  } = useProducts();

  const handleSave = (id: number | null, data: ProductFormData) => {
    if (id === null) {
      const newProduct = addProduct(data);
      setSelectedProduct(newProduct);
    } else {
      updateProduct(id, data);
      setSelectedProduct({ ...selectedProduct!, ...data });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => setSelectedProduct(null)}
          >
            Add Product
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="date">Recently Added</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <ProductList
              products={products}
              selectedProduct={selectedProduct}
              onSelect={setSelectedProduct}
              onDelete={deleteProduct}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <ProductDetails
              product={selectedProduct}
              onSave={handleSave}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;