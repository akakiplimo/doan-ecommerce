import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getOrderById, clearOrder } from '../../redux/slices/orderSlice';
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
    />
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state: any) => state.orders);

  useEffect(() => {
    // @ts-ignore
    dispatch(getOrderById(id));

    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch, id]);

  if (isLoading || !order) {
    return <Loader message='Loading Order...' />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Button
          component={RouterLink}
          to="/orders"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Orders
        </Button>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  mb: 2,
                }}
              >
                <Typography variant="h5" component="h1">
                  Order #{order.id}
                </Typography>
                <OrderStatusChip status={order.status} />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size= {{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    KES {order.total_amount}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {item.product_details.image && (
                              <img
                                src={item.product_details.image}
                                alt={item.product_details.name}
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: 'contain',
                                  marginRight: 10,
                                }}
                              />
                            )}
                            <div>
                              <Typography variant="body1">
                                {item.product_details.name}
                              </Typography>
                            </div>
                          </Box>
                        </TableCell>
                        <TableCell>KES {item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell align="right">
                          KES {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Typography variant="subtitle1">Total</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">
                          KES {order.total_amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderDetails;