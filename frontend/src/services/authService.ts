import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/users/';

// Register user
const register = async (userData: any) => {
  const response = await axios.post(API_URL + 'register/', userData);
  
  if (response.data) {
    return login({ username: userData.username, password: userData.password });
  }
  
  return response.data;
};

// Login user
const login = async (userData: any) => {
  const response = await axios.post(API_URL + 'login/', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    // Set Authorization header for all future axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
};

// Get user profile
const getProfile = async () => {
  const response = await axios.get(API_URL + 'profile/');
  return response.data;
};

// Update user profile
const updateProfile = async (userData: any) => {
  const response = await axios.put(API_URL + 'profile/', userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService;