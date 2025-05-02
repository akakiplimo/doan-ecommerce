import { useState, useEffect, SetStateAction } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

interface ProductFilterProps {
  categories: { results: { id: string; name: string }[] };
  filters: { category?: string; minPrice?: number; maxPrice?: number };
  onFilterChange: (filters: { category?: string; minPrice?: number; maxPrice?: number }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, filters, onFilterChange }) => {
  const [category, setCategory] = useState(filters.category || '');
  const [priceRange, setPriceRange] = useState([
    filters.minPrice ? Number(filters.minPrice) : 0,
    filters.maxPrice ? Number(filters.maxPrice) : 1000,
  ]);
  const [tempPriceRange, setTempPriceRange] = useState([...priceRange]);

  // Update local state when props change
  useEffect(() => {
    setCategory(filters.category || '');
    setPriceRange([
      filters.minPrice ? Number(filters.minPrice) : 0,
      filters.maxPrice ? Number(filters.maxPrice) : 1000,
    ]);
    setTempPriceRange([
      filters.minPrice ? Number(filters.minPrice) : 0,
      filters.maxPrice ? Number(filters.maxPrice) : 1000,
    ]);
  }, [filters]);

  const handleCategoryChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setCategory(value);
    onFilterChange({ category: value });
  };

  const handlePriceChange = (event: any, newValue: SetStateAction<number[]>) => {
    event.preventDefault();
    setTempPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event: any, newValue: any | ((prevState: number[]) => number[])) => {
    event.preventDefault();
    setPriceRange(newValue);
    onFilterChange({
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleClearFilters = () => {
    setCategory('');
    setPriceRange([0, 1000]);
    setTempPriceRange([0, 1000]);
    onFilterChange({
      category: '',
      minPrice: 0,
      maxPrice: 0,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Category</Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            label="Select Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {categories?.results?.map((cat: any) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={tempPriceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceChangeCommitted}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            label="Min"
            type="number"
            size="small"
            value={tempPriceRange[0]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setTempPriceRange([value, tempPriceRange[1]]);
            }}
            onBlur={() => {
              handlePriceChangeCommitted(null, tempPriceRange);
            }}
            InputProps={{
              inputProps: { min: 0, max: tempPriceRange[1] },
            }}
          />
          <TextField
            label="Max"
            type="number"
            size="small"
            value={tempPriceRange[1]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setTempPriceRange([tempPriceRange[0], value]);
            }}
            onBlur={() => {
              handlePriceChangeCommitted(null, tempPriceRange);
            }}
            InputProps={{
              inputProps: { min: tempPriceRange[0], max: 1000 },
            }}
          />
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </Paper>
  );
};

export default ProductFilter;