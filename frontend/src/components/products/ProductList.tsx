import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  useMediaQuery,
  Button,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { getProducts, getCategories } from "../../redux/slices/productSlice";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import Loader from "../common/Loader";

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { products, categories, isLoading, pagination } = useSelector(
    (state: any) => state.products
  );

  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
    search: "",
  });

  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const minPriceParam = Number(params.get("minPrice"));
    const maxPriceParam = Number(params.get("maxPrice"));
    const searchParam = params.get("search");
    const pageParam = params.get("page");
    const sortParam = params.get("ordering");

    setFilters({
      category: categoryParam || "",
      minPrice: minPriceParam || 0,
      maxPrice: maxPriceParam || 0,
      search: searchParam || "",
    });

    setPage(pageParam ? parseInt(pageParam) : 1);
    setSorting(sortParam || "");
  }, [location.search]);

  // Fetch products and categories
  useEffect(() => {
    //@ts-ignore
    dispatch(getCategories());

    // Build query params
    const queryParams: any = {};
    if (filters.category) queryParams.category = filters.category;
    if (filters.search) queryParams.search = filters.search;
    if (sorting) queryParams.ordering = sorting;
    if (page) queryParams.page = page;

    // @ts-ignore
    dispatch(getProducts(queryParams));
  }, [dispatch, filters.category, filters.search, sorting, page]);

  const handlePageChange = (event: any, value: SetStateAction<number>) => {
    event.preventDefault();
    setPage(value);
    updateUrl({ page: value });
  };

  const handleSortChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSorting(event.target.value);
    updateUrl({ ordering: event.target.value, page: 1 });
  };

  const handleFilterChange = (
    newFilters: SetStateAction<{
      category: string;
      minPrice: string;
      maxPrice: string;
      search: string;
    }>
  ) => {
    // @ts-ignore
    setFilters({ ...filters, ...newFilters });
    updateUrl({ ...newFilters, page: 1 });
    if (isMobile) {
      setFilterDrawerOpen(false);
    }
  };

  const updateUrl = (params: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const searchParams = new URLSearchParams(location.search);

    // Update existing params or add new ones
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, String(value));
      } else {
        searchParams.delete(key);
      }
    });

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  if (isLoading && !products.length) {
    return <Loader message="Loading Products..." />;
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Products
          </Typography>

          {isMobile && (
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={toggleFilterDrawer}
            >
              Filters
            </Button>
          )}

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sorting}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="price">Price (Low to High)</MenuItem>
              <MenuItem value="-price">Price (High to Low)</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
              <MenuItem value="-name">Name (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {/* Filters - Desktop */}
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3 }}>
              <ProductFilter
                categories={categories}
                filters={filters}
                // @ts-ignore
                onFilterChange={handleFilterChange}
              />
            </Grid>
          )}

          {/* Filters - Mobile */}
          {isMobile && (
            <Drawer
              anchor="left"
              open={filterDrawerOpen}
              onClose={toggleFilterDrawer}
            >
              <Box sx={{ width: 250, p: 2 }}>
                <ProductFilter
                  categories={categories}
                  filters={filters}
                  // @ts-ignore
                  onFilterChange={handleFilterChange}
                />
              </Box>
            </Drawer>
          )}

          {/* Product Grid */}
          <Grid size={{ xs: 12, md: !isMobile ? 9 : 12 }}>
            {products.length === 0 ? (
              <Typography variant="h6" sx={{ my: 3 }}>
                No products found matching your criteria
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {products.map((product: any) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {pagination.count > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Pagination
                  count={Math.ceil(pagination.count / 10)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
