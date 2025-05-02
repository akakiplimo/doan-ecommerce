import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/products/';

// Get all products
const getProducts = async (params: any = {}) => {
  const queryParams = new URLSearchParams();
  
  // Add query parameters
  if (params.category) queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);
  if (params.ordering) queryParams.append('ordering', params.ordering);
  if (params.page) queryParams.append('page', params.page);
  
  const response = await axios.get(API_URL + '?' + queryParams.toString());
  return response.data;
};

// Get product by ID
const getProductById = async (id: any) => {
  const response = await axios.get(API_URL + id + '/');
  return response.data;
};

// Create new product (admin only)
const createProduct = async (productData: any) => {
  const formData = new FormData();
  
  // Append data to FormData
  Object.keys(productData).forEach(key => {
    formData.append(key, productData[key]);
  });
  
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Update product (admin only)
const updateProduct = async (id: string, productData: { [x: string]: string | Blob; }) => {
  const formData = new FormData();
  
  // Append data to FormData
  Object.keys(productData).forEach(key => {
    formData.append(key, productData[key]);
  });
  
  const response = await axios.put(API_URL + id + '/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Delete product (admin only)
const deleteProduct = async (id: string) => {
  await axios.delete(API_URL + id + '/');
  return id;
};

// Get categories
const getCategories = async () => {
  const response = await axios.get(API_URL + 'categories/');
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};

export default productService;