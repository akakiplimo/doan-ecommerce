import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingBag as ShoppingBagIcon,
  Category as CategoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { getAllOrders } from '../../redux/slices/orderSlice';
import { getProducts, getCategories } from '../../redux/slices/productSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: any) => state.orders);
  const { products, categories } = useSelector((state: any) => state.products);

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllOrders());
    // @ts-ignore
    dispatch(getProducts());
    // @ts-ignore
    dispatch(getCategories());
  }, [dispatch]);

  // Calculate stats
  const pendingOrders = orders.results?.filter((order: { status: string; }) => order.status === 'pending').length;
  // const processingOrders = orders?.results.filter(
  //   (order: { status: string; }) => order.status === 'processing'
  // ).length;
  const totalRevenue = orders.results?.filter((order: { status: string; }) => order.status !== 'cancelled')
    .reduce((sum: any, order: { total_amount: any; }) => sum + order.total_amount, 0);

  console.log('Logs: ', orders )

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/admin/products/new"
          >
            Add New Product
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Stats Cards */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Products
                </Typography>
                <Typography variant="h4">{products.length}</Typography>
                <InventoryIcon
                  sx={{ position: 'absolute', right: 20, top: 20, opacity: 0.3 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Categories
                </Typography>
                <Typography variant="h4">{categories.results?.length}</Typography>
                <CategoryIcon
                  sx={{ position: 'absolute', right: 20, top: 20, opacity: 0.3 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Pending Orders
                </Typography>
                <Typography variant="h4">{pendingOrders}</Typography>
                <ShoppingBagIcon
                  sx={{ position: 'absolute', right: 20, top: 20, opacity: 0.3 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4">KES {totalRevenue ? Number(totalRevenue).toFixed(2) : 0}</Typography>
                <ShoppingBagIcon
                  sx={{ position: 'absolute', right: 20, top: 20, opacity: 0.3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Links */}
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Manage Products
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                component={RouterLink}
                to="/admin/products"
              >
                View All Products
              </Button>
              <Button
                variant="outlined"
                fullWidth
                component={RouterLink}
                to="/admin/categories"
              >
                Manage Categories
              </Button>
            </Paper>
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Manage Orders
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                component={RouterLink}
                to="/admin/orders"
              >
                View All Orders
              </Button>
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                component={RouterLink}
                to="/admin/orders?status=pending"
              >
                Pending Orders ({pendingOrders})
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;