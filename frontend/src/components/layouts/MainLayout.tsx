import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw' }}>
      <CssBaseline />
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;