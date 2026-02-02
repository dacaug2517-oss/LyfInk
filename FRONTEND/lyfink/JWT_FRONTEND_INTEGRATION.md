# JWT Authentication - Frontend Integration Guide

This guide explains how to integrate JWT authentication in the React frontend for the LyfInk application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Request/Response Format](#requestresponse-format)
4. [Implementation Steps](#implementation-steps)
5. [Code Examples](#code-examples)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The backend now uses **JWT (JSON Web Token)** for authentication. After successful login or registration, the API returns a JWT token that must be included in all subsequent requests to protected endpoints.

### Key Changes:
- ✅ Passwords are now **hashed** using BCrypt
- ✅ Login returns a **JWT token** instead of just user data
- ✅ All protected endpoints require the token in the `Authorization` header
- ⚠️ **Important**: Existing users with plaintext passwords cannot log in. Only newly registered users will work.

---

## 🔌 API Endpoints

### Public Endpoints (No Token Required)

These endpoints can be accessed without authentication:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login and receive JWT token |
| `GET` | `/api/states/all` | Get all states (for dropdown) |
| `GET` | `/api/cities/bystate/{sid}` | Get cities by state ID (for dropdown) |
| `GET` | `/api/roles/all` | Get all roles (for dropdown) |
| `GET` | `/api/bloodcomponents/category/{cat}` | Get blood components by category (for dropdown) |

### Protected Endpoints (Token Required)

All other endpoints require a valid JWT token in the `Authorization` header.

---

## 📦 Request/Response Format

### 1. Registration

**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "mobno": 9876543210,
  "address": "123 Main St",
  "security_question": "What is your pet's name?",
  "security_answer": "Fluffy",
  "rid": 2,
  "stateid": 1,
  "cityid": 1,
  "donorDetails": {
    "dob": "1990-01-01",
    "gender": "Male",
    "medical_history": "None",
    "bcid": 1
  }
}
```

**Response:**
```json
{
  "userid": 123,
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "mobno": 9876543210,
  "address": "123 Main St",
  "role": {
    "rid": 2,
    "rname": "Donor"
  },
  "state": { ... },
  "city": { ... }
}
```

---

### 2. Login

**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userid": 123,
  "email": "john.doe@example.com",
  "rid": 2,
  "hbid": 0
}
```

**For Hospital/Blood Bank Login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userid": 0,
  "email": "hospital@example.com",
  "rid": 3,
  "hbid": 45
}
```

**Error Response:**
```json
{
  "message": "Invalid Password!"
}
```
or
```json
{
  "message": "User Not Found!"
}
```

---

### 3. Protected Endpoint Example

**Endpoint:** `GET /api/some-protected-endpoint`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ Implementation Steps

### Step 1: Install Axios (if not already installed)

```bash
npm install axios
```

---

### Step 2: Create an Axios Instance with Interceptor

Create a file `src/utils/axiosInstance.js`:

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

### Step 3: Create Authentication Service

Create a file `src/services/authService.js`:

```javascript
import axiosInstance from '../utils/axiosInstance';

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/users/login', {
        email,
        password,
      });

      const { token, userid, email: userEmail, rid, hbid } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        userid,
        email: userEmail,
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
```

---

## 💻 Code Examples

### Login Component

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      console.log('Login successful:', response);
      
      // Redirect based on role
      if (response.rid === 1) {
        navigate('/admin/dashboard');
      } else if (response.rid === 2) {
        navigate('/donor/dashboard');
      } else if (response.rid === 3) {
        navigate('/hospital/dashboard');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

---

### Protected Route Component

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rid)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

**Usage in App.js:**

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### Making API Calls to Protected Endpoints

```javascript
import axiosInstance from '../utils/axiosInstance';

// Example: Fetch donor profile
const fetchDonorProfile = async (donorId) => {
  try {
    const response = await axiosInstance.get(`/api/donors/${donorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donor profile:', error);
    throw error;
  }
};

// Example: Update blood stock
const updateBloodStock = async (stockData) => {
  try {
    const response = await axiosInstance.post('/api/blood-stock/update', stockData);
    return response.data;
  } catch (error) {
    console.error('Error updating blood stock:', error);
    throw error;
  }
};
```

---

## ✅ Best Practices

### 1. **Token Storage**
- Store JWT token in `localStorage` for persistence across sessions
- For higher security, consider using `httpOnly` cookies (requires backend changes)

### 2. **Token Expiration**
- The JWT token expires after **10 hours**
- Handle token expiration gracefully by redirecting to login
- Consider implementing token refresh mechanism

### 3. **Secure Password Handling**
- Never store passwords in localStorage or state
- Always use HTTPS in production
- Implement password strength validation

### 4. **Error Handling**
- Display user-friendly error messages
- Log detailed errors for debugging
- Handle network errors gracefully

### 5. **Role-Based Access**
- Check user roles before rendering components
- Protect routes based on user roles
- Hide/disable UI elements based on permissions

---

## 🐛 Troubleshooting

### Issue: "Invalid Password" error for existing users

**Cause:** Existing users have plaintext passwords in the database, but the system now expects hashed passwords.

**Solution:** 
- Ask existing users to re-register with a new account, OR
- Manually update passwords in the database using BCrypt hash, OR
- Create a migration script to hash existing passwords

---

### Issue: 401 Unauthorized on protected endpoints

**Cause:** Token is missing, invalid, or expired.

**Solution:**
1. Check if token exists in localStorage: `localStorage.getItem('token')`
2. Verify token is being sent in the `Authorization` header
3. Check token format: `Bearer <token>`
4. Try logging in again to get a fresh token

---

### Issue: CORS errors

**Cause:** Backend is not configured to accept requests from the frontend origin.

**Solution:**
- Ensure `@CrossOrigin("*")` is present on controllers
- Or configure CORS in `SecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

### Issue: Token not persisting after page refresh

**Cause:** Token is stored in component state instead of localStorage.

**Solution:**
- Always store token in `localStorage.setItem('token', token)`
- Retrieve on app load: `localStorage.getItem('token')`

---

## 📝 Summary

1. **Register/Login** → Receive JWT token
2. **Store token** in localStorage
3. **Include token** in all API requests via `Authorization: Bearer <token>` header
4. **Handle expiration** by redirecting to login on 401 errors
5. **Protect routes** based on authentication status and user roles

---

## 🔗 Additional Resources

- [JWT.io](https://jwt.io/) - Decode and verify JWT tokens
- [React Router v6 Docs](https://reactrouter.com/) - For protected routes
- [Axios Documentation](https://axios-http.com/) - For HTTP requests

---

**Need Help?** Contact the backend team for any issues or questions.

**Last Updated:** February 1, 2026
