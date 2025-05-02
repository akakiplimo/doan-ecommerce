import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart,
} from '@mui/icons-material';
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import { createOrder } from '../../redux/slices/orderSlice';
import Loader from '../common/Loader';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state: any) => state.cart);
  const { isLoading: orderLoading, isSuccess: orderSuccess, order } = useSelector(
    (state: any) => state.orders
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (orderSuccess && order) {
      // Redirect to order details page after successful order creation
      window.location.href = `/orders/${order.id}`;
    }
  }, [orderSuccess, order]);

  const handleUpdateQuantity = (id: any, currentQuantity: any, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      // @ts-ignore
      dispatch(updateCartItem({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    // @ts-ignore
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // @ts-ignore
    dispatch(createOrder());
  };

  // Calculate total price
  const totalPrice = items.reduce(
    (sum: number, item: { product_details: { price: number; }; quantity: number; }) => sum + item.product_details.price * item.quantity,
    0
  );

  if (isLoading) {
    return <Loader message='Loading cart...' />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>

        {items.length === 0 ? (
          <Paper sx={{ p: 3, mt: 3, textAlign: 'center' }}>
            <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added any products to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/products"
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <Paper sx={{ p: 2 }}>
                {items.map((item: any) => (
                  <Box key={item.id}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <img
                          src={
                            item.product_details.image || '/placeholder.png'
                          }
                          alt={item.product_details.name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '100px',
                            objectFit: 'contain',
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="subtitle1">
                          {item.product_details.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          KES {item.product_details.price}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity, -1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity, 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                          }}
                        >
                          <Typography variant="subtitle1">
                            KES {(item.product_details.price * item.quantity).toFixed(2)}
                          </Typography>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">KES {totalPrice.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">KES {totalPrice.toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={orderLoading}
                >
                  {orderLoading ? 'Processing...' : 'Checkout'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;