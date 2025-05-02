import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getProfile } from "../redux/slices/authSlice";
import Loader from "../components/common/Loader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state: any) => state.auth
  );

  console.log("ProfilePage user:", user);
  console.log("ProfilePage isAuthenticated:", isAuthenticated);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    message: string;
    severity: "error" | "info" | "success" | "warning";
  }>({
    show: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.user?.first_name || "",
        last_name: user.user?.last_name || "",
        email: user.user?.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Here you would dispatch action to update profile
    // For now, we'll just show a success message
    setAlertInfo({
      show: true,
      message: "Profile updated successfully!",
      severity: "success",
    });

    setTimeout(() => {
      setAlertInfo({ ...alertInfo, show: false });
    }, 3000);
  };

  const handlePasswordSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      setAlertInfo({
        show: true,
        message: "Passwords do not match!",
        severity: "error",
      });
      return;
    }

    // Here you would dispatch action to change password
    // For now, we'll just show a success message
    setAlertInfo({
      show: true,
      message: "Password changed successfully!",
      severity: "success",
    });

    // Reset password fields
    setPasswordData({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

    setTimeout(() => {
      setAlertInfo({ ...alertInfo, show: false });
    }, 3000);
  };

  if (isLoading) {
    return <Loader message="Loading profile..." />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Profile
          </Typography>
          {user.user?.is_staff && isAuthenticated && (
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/admin"
              sx={{ ml: 5, mb: 2 }}
            >
              Admin Dashboard
            </Button>
          )}
        </Box>

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} sx={{ mb: 3 }}>
            {alertInfo.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleProfileSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" color="primary">
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Change Password */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handlePasswordSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="current_password"
                      type="password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="new_password"
                      type="password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirm_password"
                      type="password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" color="primary">
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
