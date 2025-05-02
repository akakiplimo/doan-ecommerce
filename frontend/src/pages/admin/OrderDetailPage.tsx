import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getOrderById, updateOrderStatus, clearOrder } from '../../redux/slices/orderSlice';
import Loader from '../../components/common/Loader';

const OrderStatusChip = ({ status }: any) => {
  let color: 'default' | 'primary' | 'info' | 'success' | 'error' | 'secondary' | 'warning';
  switch (status) {
    case 'pending':
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

const AdminOrderDetailPage = () => {
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

  const handleStatusChange = (e: { target: { value: any; }; }) => {
    const newStatus = e.target.value;
    // @ts-ignore
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  if (isLoading || !order) {
    return <Loader message='Loading Order...'/>;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Button
          component={RouterLink}
          to="/admin/orders"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Orders
        </Button>

        {/* Order Overview */}
        <Paper sx={{ p: 3, mb: 3 }}>
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
            <Box>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                  labelId="order-status-label"
                  value={order.status}
                  label="Order Status"
                  onChange={handleStatusChange}
                  renderValue={(value) => (
                    <OrderStatusChip status={value} />
                  )}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(order.created_at).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Customer
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.user.username}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.user.email}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="body1" gutterBottom>
                KES {order.total_amount}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Order Items */}
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
                          <Typography variant="body2" color="text.secondary">
                            ID: {item.product}
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

          {/* Order Actions */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" component={RouterLink} to="/admin/orders">
              Back to Orders
            </Button>
            {order.status === 'pending' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  // @ts-ignore
                  dispatch(updateOrderStatus({ id, status: 'processing' }))
                }
              >
                Process Order
              </Button>
            )}
            {order.status === 'processing' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  // @ts-ignore
                  dispatch(updateOrderStatus({ id, status: 'shipped' }))
                }
              >
                Mark as Shipped
              </Button>
            )}
            {order.status === 'shipped' && (
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  // @ts-ignore
                  dispatch(updateOrderStatus({ id, status: 'delivered' }))
                }
              >
                Mark as Delivered
              </Button>
            )}
            {(order.status === 'pending' || order.status === 'processing') && (
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  // @ts-ignore
                  dispatch(updateOrderStatus({ id, status: 'cancelled' }))
                }
              >
                Cancel Order
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminOrderDetailPage;