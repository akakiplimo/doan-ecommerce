import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../redux/slices/authSlice';

const AdminRoute = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    //@ts-ignore
    dispatch(getProfile())
  }, [dispatch])

  console.log('AdminRoute user:', user);
  console.log('AdminRoute isAuthenticated:', isAuthenticated);
  

  return isAuthenticated && user.user?.is_staff ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;