# JWT Authentication Implementation - Summary

## ✅ Changes Applied

### 1. **Core Files Created**

#### `src/utils/axiosInstance.js`
- Axios instance with JWT interceptors
- Automatically adds `Authorization: Bearer <token>` header to all requests
- Handles 401 errors by redirecting to login

#### `src/services/authService.js`
- Centralized authentication service
- Functions: `login()`, `register()`, `logout()`, `getCurrentUser()`, `isAuthenticated()`
- Manages JWT token storage in localStorage

#### `src/services/apiService.js`
- Centralized API service for all backend calls
- Uses axiosInstance for automatic JWT authentication
- Includes endpoints for: Blood Components, States/Cities, Donor, Blood Stock, Blood Requests, Donation Camps, Hospital/Blood Bank

#### `src/components/ProtectedRoute.jsx`
- Route wrapper for authentication and role-based access control
- Redirects unauthenticated users to `/login`
- Redirects unauthorized users to `/unauthorized`

#### `src/components/Unauthorized.jsx`
- Error page for unauthorized access attempts

### 2. **Updated Files**

#### `src/App.js`
- Wrapped all dashboard routes with `ProtectedRoute`
- Role-based access control:
  - Admin Dashboard: Role ID = 1
  - Donor Dashboard: Role ID = 2
  - Hospital Dashboard: Role ID = 3
- Added `/unauthorized` route

#### `src/components/BloodBankLogin.jsx`
- Updated to use `authService.login()`
- Added error state and loading state
- Displays error messages to users
- Stores JWT token in localStorage

#### `src/services/UserService.js`
- Updated to use `authService.register()`

#### `src/services/HbService.js`
- Updated to use `axiosInstance` for JWT authentication

## 🔑 How JWT Authentication Works

### Login Flow
1. User enters email and password
2. Frontend calls `authService.login(email, password)`
3. Backend validates credentials and returns JWT token
4. Token is stored in `localStorage`
5. User is redirected to appropriate dashboard based on role

### Protected API Calls
1. User makes API request (e.g., fetch donor profile)
2. `axiosInstance` interceptor automatically adds JWT token to request headers
3. Backend validates token
4. If valid, returns data; if invalid/expired, returns 401
5. On 401, user is automatically logged out and redirected to login

### Token Storage
- **Token**: `localStorage.getItem('token')`
- **User Info**: `localStorage.getItem('user')` (contains: userid, email, rid, hbid)

## 📋 Role IDs
- **1**: Admin
- **2**: Donor
- **3**: Hospital/Blood Bank

## 🚀 Usage Examples

### Making Authenticated API Calls

```javascript
import apiService from '../services/apiService';

// Example: Get donor profile
const fetchProfile = async () => {
  try {
    const response = await apiService.getDonorProfile(userId);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Checking Authentication Status

```javascript
import authService from '../services/authService';

const user = authService.getCurrentUser();
const isLoggedIn = authService.isAuthenticated();

if (isLoggedIn) {
  console.log('User:', user);
}
```

### Logout

```javascript
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleLogout = () => {
  authService.logout();
  navigate('/login');
};
```

## ⚠️ Important Notes

1. **Existing Users**: Users with plaintext passwords in the database cannot log in. Only newly registered users will work.

2. **Token Expiration**: JWT tokens expire after 10 hours. Users will be automatically logged out when the token expires.

3. **CORS**: Ensure backend has CORS configured to accept requests from `http://localhost:3000`

4. **HTTPS**: In production, always use HTTPS to prevent token interception.

## 🔧 Next Steps (Optional Improvements)

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Remember Me**: Add option to persist login across browser sessions
3. **Password Reset**: Implement forgot password functionality
4. **Email Verification**: Add email verification for new registrations
5. **Two-Factor Authentication**: Add 2FA for enhanced security

## 📚 Files Reference

### New Files
- `src/utils/axiosInstance.js`
- `src/services/authService.js`
- `src/services/apiService.js`
- `src/components/ProtectedRoute.jsx`
- `src/components/Unauthorized.jsx`

### Modified Files
- `src/App.js`
- `src/components/BloodBankLogin.jsx`
- `src/services/UserService.js`
- `src/services/HbService.js`

## ✅ Testing Checklist

- [ ] Register a new user
- [ ] Login with registered user
- [ ] Verify token is stored in localStorage
- [ ] Access protected dashboard (should work)
- [ ] Try accessing dashboard without login (should redirect to login)
- [ ] Try accessing admin dashboard as donor (should redirect to unauthorized)
- [ ] Logout and verify token is removed
- [ ] Test API calls with authentication

---

**Implementation Date**: February 1, 2026
**Status**: ✅ Complete
