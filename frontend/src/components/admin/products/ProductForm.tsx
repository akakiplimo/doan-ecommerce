import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  createProduct,
  getProductById,
  updateProduct,
  getCategories,
  reset,
} from '../../../redux/slices/productSlice';
import Loader from '../../common/Loader';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, categories, isLoading, isSuccess, isError, message } = useSelector(
    (state: any) => state.products
  );

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    // @ts-ignore
    dispatch(getCategories());

    if (isEditMode) {
      // @ts-ignore
      dispatch(getProductById(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
      });
      
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [isEditMode, product]);

  useEffect(() => {
    if (isSuccess && isSubmitting) {
      navigate('/admin/products');
    }
  }, [isSuccess, navigate, isSubmitting]);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      newErrors.price = 'Price must be a positive number';
    
    if (!formData.stock) newErrors.stock = 'Stock is required';
    else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0)
      newErrors.stock = 'Stock must be a non-negative number';
    
    if (!formData.category) newErrors.category = 'Category is required';
    
    if (!isEditMode && !image) newErrors.image = 'Image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      
      if (files && files[0]) {
        const file = files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create form data for API submission
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('stock', formData.stock);
      productData.append('category', formData.category);
      
      if (image) {
        productData.append('image', image);
      }
      
      if (isEditMode) {
        // @ts-ignore
        dispatch(updateProduct({ id, productData }));
      } else {
        // @ts-ignore
        dispatch(createProduct(productData));
      }
    }
  };

  if ((isLoading && isEditMode && !product) || (!categories.results.length && !isError)) {
    return <Loader message='Loading Product Form...' />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid size={{xs: 12, sm: 6}}>
                <TextField
                  required
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              
              <Grid size={{xs: 12, sm: 6}} >
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories.results.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid size={{xs: 12, sm: 6}} >
                <TextField
                  required
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Grid>
              
              <Grid size={{xs: 12, sm: 6}} >
                <TextField
                  required
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                />
              </Grid>
              
              <Grid size={{xs: 12}}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              
              <Grid size={{xs: 12}}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ height: 56 }}
                >
                  Upload Product Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {errors.image && (
                  <FormHelperText error>{errors.image}</FormHelperText>
                )}
              </Grid>
              
              {imagePreview && (
                <Grid size={{xs: 12}}>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </Grid>
              )}
              
              {isError && (
                <Grid size={{xs: 12}}>
                  <Typography color="error">{message}</Typography>
                </Grid>
              )}
              
              <Grid size={{xs: 12}} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/products')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        {isEditMode ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      isEditMode ? 'Update Product' : 'Create Product'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminProductForm;