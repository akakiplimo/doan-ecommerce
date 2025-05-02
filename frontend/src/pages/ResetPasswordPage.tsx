import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
} from "@mui/material";
import { LockReset } from "@mui/icons-material";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Here you would call the password reset API
      // For now, we'll just simulate success
      setStep(2);
      setAlertInfo({
        show: true,
        message:
          "If an account with that email exists, we have sent password reset instructions.",
        severity: "success",
      });
    } catch (error: any) {
      setAlertInfo({
        show: true,
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockReset />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>

          {alertInfo.show && (
            // @ts-ignore
            <Alert severity={alertInfo.severity} sx={{ mt: 2, width: "100%" }}>
              {alertInfo.message}
            </Alert>
          )}

          {step === 1 ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Instructions
              </Button>
              <Grid container justifyContent="center">
                <Grid>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Back to Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please check your email for instructions on how to reset your
                password.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
              >
                Return to Login
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
