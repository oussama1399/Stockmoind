import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { stockService } from '../services/api';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [stockLevels, setStockLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    unit_price: '',
    min_stock_level: 0,
    max_stock_level: 1000,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsResponse, stockResponse] = await Promise.all([
        stockService.getProducts(),
        stockService.getStockLevels(),
      ]);
      setProducts(productsResponse.data);
      setStockLevels(stockResponse.data);
    } catch (err) {
      setError('Failed to load stock data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await stockService.createProduct(newProduct);
      handleClose();
      loadData();
      setNewProduct({
        name: '',
        sku: '',
        category: '',
        unit_price: '',
        min_stock_level: 0,
        max_stock_level: 1000,
      });
    } catch (err) {
      setError('Failed to create product');
    }
  };

  if (loading) {
    return <Typography>Loading stock data...</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Stock Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock Level</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const stockItem = stockLevels.find(s => s.product_id === product.id);
              const stockLevel = stockItem?.quantity || 0;
              const status = stockLevel <= product.min_stock_level ? 'Low Stock' : 'In Stock';

              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{stockLevel}</TableCell>
                  <TableCell>€{product.unit_price}</TableCell>
                  <TableCell>
                    <Typography
                      color={status === 'Low Stock' ? 'error' : 'success.main'}
                    >
                      {status}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            fullWidth
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="sku"
            label="SKU"
            fullWidth
            value={newProduct.sku}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="unit_price"
            label="Unit Price"
            type="number"
            fullWidth
            value={newProduct.unit_price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="min_stock_level"
            label="Min Stock Level"
            type="number"
            fullWidth
            value={newProduct.min_stock_level}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="max_stock_level"
            label="Max Stock Level"
            type="number"
            fullWidth
            value={newProduct.max_stock_level}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockManagement;