import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { getProducts, getCategories } from "../redux/slices/productSlice";
import Loader from "../components/common/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, categories, isLoading } = useSelector(
    (state: any) => state.products
  );

  console.log("Products:", products);
  console.log("Categories:", categories.results);
  console.log("Loading:", isLoading);

  // Fetch featured products (first 6 products)
  useEffect(() => {
    //@ts-ignore
    dispatch(getProducts({ limit: 6 }));
    //@ts-ignore
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading && !products.length) {
    return <Loader message="Loading Products..." />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          mb: 6,
          borderRadius: { xs: 0, md: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Welcome to Doan
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Discover amazing products with great deals. Shop the latest
                trends in fashion, electronics, home decor, and more.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{ mt: 2 }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="/shopping_2.jpg"
                alt="Shopping"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                  display: { xs: "none", md: "block" },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <Grid key={product.id} size={{ xs: 12, md: 4, sm: 6 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image || "/placeholder.png"}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        noWrap
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        KES {product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        component={RouterLink}
                        to={`/products/${product.id}`}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box>No products. Contact the admin for help</Box>
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/products"
            >
              View All Products
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: "grey.100", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {categories && categories?.results?.length > 0 ? (
              categories?.results.map((category: any) => (
                <Grid key={category.id} size={{ xs: 6, md: 3, sm: 4 }}>
                  <Card
                    component={RouterLink}
                    to={`/products?category=${category.id}`}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box>No categories. Contact the admin for help</Box>
            )}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg">
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Free Shipping
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Enjoy free shipping on all orders above KES 5000.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Easy Returns
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  30-day easy return policy for all products.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Secure Payment
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Multiple secure payment options available.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
