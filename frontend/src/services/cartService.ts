import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/orders/';

// Get cart
const getCart = async () => {
  const response = await axios.get(API_URL + 'cart/');
  return response.data;
};

// Add item to cart
const addToCart = async (itemData: any) => {
  const response = await axios.post(API_URL + 'cart/items/', itemData);
  return response.data;
};

// Update cart item
const updateCartItem = async (id: string, quantity: any) => {
  const response = await axios.put(API_URL + 'cart/items/' + id + '/', { quantity });
  return response.data;
};

// Remove item from cart
const removeFromCart = async (id: string) => {
  await axios.delete(API_URL + 'cart/items/' + id + '/');
  return id;
};

const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};

export default cartService;