import { authServiceAxios, publicAuthAxios } from '../utils/axiosInstance';

const authService = {
  // Register a new user (public endpoint - no auth required)
  register: async (userData) => {
    try {
      const response = await publicAuthAxios.post('/api/users/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  // Register a new Hospital (Authenticated - Admin Only)
  registerHospital: async (hospitalData) => {
    try {
      const response = await authServiceAxios.post('/api/users/register-hospital', hospitalData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Hospital Registration failed';
    }
  },

  // Login user (public endpoint - no auth required)
  login: async (email, password) => {
    try {
      const response = await publicAuthAxios.post('/api/users/login', {
        email,
        password,
      });

      const { token, userid, email: userEmail, rid, hbid, username } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        userid,
        email: userEmail,
        name: username, // Map 'username' to 'name'
        rid,
        hbid,
      }));

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
