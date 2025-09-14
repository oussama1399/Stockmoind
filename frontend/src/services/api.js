import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (username, password) => api.post('/auth/token', { username, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const stockService = {
  getProducts: (params) => api.get('/stock/products', { params }),
  createProduct: (product) => api.post('/stock/products', product),
  updateProduct: (id, product) => api.put(`/stock/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/stock/products/${id}`),
  getStockLevels: (warehouseId) => api.get('/stock', { params: { warehouse_id: warehouseId } }),
  createTransaction: (transaction) => api.post('/stock/transactions', transaction),
  getWarehouses: () => api.get('/stock/warehouses'),
  createWarehouse: (warehouse) => api.post('/stock/warehouses', warehouse),
};

export const analyticsService = {
  getStockSummary: () => api.get('/analytics/stock-summary'),
  getSalesTrends: (days) => api.get('/analytics/sales-trends', { params: { days } }),
  getDemandPrediction: (productId, days) => api.get('/analytics/demand-prediction', {
    params: { product_id: productId, days_ahead: days }
  }),
};

export const aiVisionService = {
  countStockFromImage: (file, productId) => {
    const formData = new FormData();
    formData.append('file', file);
    if (productId) formData.append('product_id', productId);
    return api.post('/ai-vision/count-stock', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  detectProducts: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/ai-vision/detect-products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export const chatbotService = {
  query: (query) => api.post('/chatbot/query', { query }),
  getSuggestions: () => api.get('/chatbot/suggestions'),
};

export default api;