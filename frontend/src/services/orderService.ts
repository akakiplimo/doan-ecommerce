import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/orders/';

// Create order
const createOrder = async () => {
  const response = await axios.post(API_URL + 'orders/');
  return response.data;
};

// Get user orders
const getOrders = async () => {
  const response = await axios.get(API_URL + 'orders/');
  return response.data;
};

// Get order by ID
const getOrderById = async (id: string) => {
  const response = await axios.get(API_URL + 'orders/' + id + '/');
  return response.data;
};

// Get all orders (admin only)
const getAllOrders = async () => {
  const response = await axios.get(API_URL + 'orders/');
  return response.data;
};

// Update order status (admin only)
const updateOrderStatus = async (id: string, status: any) => {
  const response = await axios.patch(API_URL + 'orders/' + id + '/', { status });
  return response.data;
};

const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};

export default orderService;