import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setupAuthHeader, initializeAuth } from "./utils/authHeader";
import axios from "axios";

// Layout components
import MainLayout from "./components/layouts/MainLayout";

// Public pages
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

// Protected pages
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";

// Admin pages
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminProductListPage from "./pages/admin/ProductListPage";
import AdminProductFormPage from "./pages/admin/ProductFormPage";
import AdminOrderListPage from "./pages/admin/OrderListPage";
import AdminOrderDetailPage from "./pages/admin/OrderDetailPage";

// Route guards
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";

function App() {
  const dispatch = useDispatch();

  // Initialize auth from localStorage on app load
  useEffect(() => {
    const user = initializeAuth();
    if (user) {
      // Set the auth header for all future axios requests
      axios.defaults.headers.common["Authorization"] = setupAuthHeader();
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<OrderListPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/products" element={<AdminProductListPage />} />
            <Route
              path="admin/products/new"
              element={<AdminProductFormPage />}
            />
            <Route
              path="admin/products/:id/edit"
              element={<AdminProductFormPage />}
            />
            <Route path="admin/orders" element={<AdminOrderListPage />} />
            <Route path="admin/orders/:id" element={<AdminOrderDetailPage />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
