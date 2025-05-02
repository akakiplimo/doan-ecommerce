import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getOrders } from '../../redux/slices/orderSlice';
import Loader from '../common/Loader';

const OrderStatusChip = ({ status }: { status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' }) => {
  let color: 'default' | 'primary' | 'info' | 'success' | 'error' | 'secondary' | 'warning';
  switch (status) {
    case 'pending':
      color = 'default';
      break;
    case 'processing':
      color = 'primary';
      break;
    case 'shipped':
      color = 'info';
      break;
    case 'delivered':
      color = 'success';
      break;
    case 'cancelled':
      color = 'error';
      break;
    default:
      color = 'default';
  }

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={color}
      size="small"
    />
  );
};

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state: any) => state.orders);

  console.log('Orders:', orders);

  useEffect(() => {
    // @ts-ignore
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Loader message='Loading Orders...' />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              You haven't placed any orders yet
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/products"
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.results.length < 1 ? 
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    No orders found
                  </Typography>
                </Box> :
                orders.results.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>KES {order.total_amount}</TableCell>
                    <TableCell>
                      <OrderStatusChip status={order.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        component={RouterLink}
                        to={`/orders/${order.id}`}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default OrderList;