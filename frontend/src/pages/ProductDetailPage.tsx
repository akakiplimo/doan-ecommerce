import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Paper,
  Chip,
  IconButton,
  TextField,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  AddShoppingCart,
  ArrowBack,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { getProductById, clearProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/common/Loader';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state: any) => state.products
  );
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    message: string;
    severity: 'error' | 'info' | 'success' | 'warning';
  }>({
    show: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(getProductById(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        // @ts-ignore
        addToCart({
          product: product.id,
          quantity,
        })
      );
      setAlertInfo({
        show: true,
        message: 'Product added to cart successfully!',
        severity: 'success',
      });
      setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 3000);
    } else {
      setAlertInfo({
        show: true,
        message: 'Please login to add items to your cart',
        severity: 'warning',
      });
      setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 3000);
    }
  };

  if (isLoading || !product) {
    return <Loader message='Loading Product...' />;
  }

  if (isError) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {message || 'Error loading product.'}
        </Alert>
        <Button
          component={RouterLink}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/products" color="inherit">
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        {/* Alert for cart actions */}
        {alertInfo.show && (
          <Alert severity={alertInfo.severity} sx={{ mb: 3 }}>
            {alertInfo.message}
          </Alert>
        )}

        <Paper elevation={2} sx={{ p: 3 }}>
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                component="img"
                src={product.image || '/placeholder.png'}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  objectFit: 'contain',
                  maxHeight: 400,
                }}
              />
            </Grid>

            {/* Product Details */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                  KES {product.price}
                </Typography>
                <Chip
                  label={product.category_name}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Box>

              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Availability:
                  {product.stock > 0 ? (
                    <Chip
                      label={`In Stock (${product.stock} available)`}
                      color="success"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  ) : (
                    <Chip label="Out of Stock" color="error" size="small" sx={{ ml: 1 }} />
                  )}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  inputProps={{ readOnly: true }}
                  sx={{ width: 60, mx: 1, '& input': { textAlign: 'center' } }}
                />
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                component={RouterLink}
                to="/products"
                startIcon={<ArrowBack />}
                fullWidth
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;