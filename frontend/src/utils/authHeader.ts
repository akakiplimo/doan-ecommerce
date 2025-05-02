// Setup auth header on app load
export const setupAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.access) {
      return `Bearer ${user.access}`;
    }
    return null;
  };
  
  // Check token expiration
  export const isTokenExpired = (token: string) => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };
  
  // Initialize auth from localStorage
  export const initializeAuth = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.access && !isTokenExpired(user.access)) {
      return user;
    }
    return null;
  };