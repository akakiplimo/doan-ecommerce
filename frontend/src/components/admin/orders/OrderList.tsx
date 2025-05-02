import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
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
  TextField,
} from '@mui/material';
import { getAllOrders, updateOrderStatus } from '../../../redux/slices/orderSlice';
import Loader from '../../common/Loader';

const OrderStatusChip = ({ status }: any) => {
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

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders: fetchedOrders, isLoading } = useSelector((state: any) => state.orders);

  const orders = fetchedOrders?.results || [];

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    // Get status from URL if available
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    if (statusParam) {
      setStatusFilter(statusParam);
    }
  }, [location]);

  useEffect(() => {
    if (orders.length > 0) {
      let result: any = [...orders];
      
      // Apply status filter
      if (statusFilter) {
        result = result.filter((order: any) => order.status === statusFilter);
      }
      
      // Apply search filter (by order ID or username)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          (order: any) =>
            order.id.toString().includes(term) ||
            (order.user && order.user.username.toLowerCase().includes(term))
        );
      }
      
      setFilteredOrders(result);
    }
  }, [orders, statusFilter, searchTerm]);

  const handleStatusChange = (orderId: any, newStatus: any) => {
    // @ts-ignore
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const handleStatusFilterChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setStatusFilter(value);
    
    // Update URL
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set('status', value);
    } else {
      searchParams.delete('status');
    }
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (orderId: any) => {
    navigate(`/admin/orders/${orderId}`);
  };

  if (isLoading && !orders.length) {
    return <Loader message='Loading orders...' />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Orders
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            label="Search Orders"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by order ID or username"
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status Filter"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.user.username}</TableCell>
                    <TableCell>KES {order.total_amount}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          variant="standard"
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
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {statusFilter
                      ? `No orders with status "${statusFilter}"`
                      : 'No orders found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminOrderList;