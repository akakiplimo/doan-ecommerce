import { Box, Container, Divider, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are an e-commerce platform dedicated to providing quality
              products at competitive prices.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, KE
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@doanstore.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +254 (755) 123-456
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Links
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Terms & Conditions
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" display="block">
              FAQs
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Doan Store
          </Link>{" "}
          {new Date().getFullYear()}
          {"™."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
