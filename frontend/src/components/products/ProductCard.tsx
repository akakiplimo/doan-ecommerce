import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product }: {product: any}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        // @ts-ignore
        addToCart({
          product: product.id,
          quantity: 1,
        })
      );
    } else {
      // Redirect to login or show login prompt
      alert('Please login to add items to your cart');
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/placeholder.png'}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="h6" color="primary">
            KES {product.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {product.category_name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          size="small"
          component={RouterLink}
          to={`/products/${product.id}`}
        >
          View Details
        </Button>
        <IconButton
          color="primary"
          aria-label="add to cart"
          onClick={handleAddToCart}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;