import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

// Define a CartItem type
interface CartItem {
    id: string; // Unique identifier for the cart item
    product: string; // Product ID or object reference
    quantity: number; // Quantity of the product in the cart
    // Add other properties as needed (e.g., price, name, etc.)
  }

// Get cart
export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Add item to cart
export const addToCart = createAsyncThunk('cart/addItem', async (itemData, thunkAPI) => {
  try {
    return await cartService.addToCart(itemData);
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ id, quantity }: { id: string; quantity: any }, thunkAPI) => {
    try {
      return await cartService.updateCartItem(id, quantity);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk('cart/removeItem', async (id: string, thunkAPI) => {
  try {
    await cartService.removeFromCart(id);
    return id;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  items: [] as CartItem[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.items;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Check if item already exists in cart
        const existingItem = state.items.find(
          (item: any) => item.product === action.payload.product
        );
        
        if (existingItem) {
          // Update quantity
          state.items = state.items.map((item: any) =>
            item.product === action.payload.product ? action.payload : item
          );
        } else {
          // Add new item
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.map((item: any) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter((item: any) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, clearCart } = cartSlice.actions;
export default cartSlice.reducer;