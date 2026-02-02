# Developer Migration Guide - JWT Authentication

## 🔄 Migrating Existing Components to JWT

If you have existing components that make API calls, follow these steps to migrate them to use JWT authentication:

### Step 1: Replace Direct Axios Calls

**Before:**
```javascript
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('http://localhost:8080/api/some-endpoint');
  return response.data;
};
```

**After:**
```javascript
import axiosInstance from '../utils/axiosInstance';

const fetchData = async () => {
  const response = await axiosInstance.get('/api/some-endpoint');
  return response.data;
};
```

### Step 2: Use Centralized API Service (Recommended)

**Better Approach:**
```javascript
import apiService from '../services/apiService';

const fetchData = async () => {
  const response = await apiService.getDonorProfile(userId);
  return response.data;
};
```

### Step 3: Update Components Making API Calls

#### Example: DonorProfile.jsx

**Before:**
```javascript
const res = await axios.get(`http://localhost:8080/api/donor/profile/${userId}`);
```

**After:**
```javascript
import apiService from '../../services/apiService';

const res = await apiService.getDonorProfile(userId);
```

#### Example: RequestBlood.jsx

**Before:**
```javascript
axios.get("http://localhost:8080/api/bloodcomponents")
  .then(res => setBloodComponents(res.data));
```

**After:**
```javascript
import apiService from '../../services/apiService';

apiService.getBloodComponents()
  .then(res => setBloodComponents(res.data));
```

### Step 4: Add Logout Functionality

**In any dashboard component:**
```javascript
import LogoutButton from '../LogoutButton';

// In your JSX:
<LogoutButton className="btn btn-danger" />
```

## 📋 Components That Need Migration

Based on the codebase scan, these components need to be updated:

### High Priority (Protected Endpoints)
- [ ] `src/components/Donor/DonorProfile.jsx` - Lines 240, 257
- [ ] `src/components/HB/RequestBlood.jsx` - Lines 24, 31, 39, 69
- [ ] `src/components/HB/DonationCamp.jsx` - Line 74
- [ ] `src/components/Admin/Reports/HospitalStockChart.jsx` - Line 10

### Medium Priority (Public Endpoints)
- [ ] `src/components/DonorRegister.jsx` - Lines 53, 61, 71

## 🛠️ Migration Template

Use this template for migrating components:

```javascript
// 1. Add imports at the top
import apiService from '../../services/apiService';
import authService from '../../services/authService';

// 2. Get current user if needed
const user = authService.getCurrentUser();

// 3. Replace axios calls
// OLD: axios.get('http://localhost:8080/api/endpoint')
// NEW: apiService.methodName()

// 4. Handle errors properly
try {
  const response = await apiService.methodName();
  // Handle success
} catch (error) {
  console.error('Error:', error);
  // Handle error (user will be auto-redirected if 401)
}
```

## 🔍 Finding Components to Migrate

Search for these patterns in your codebase:
- `axios.get(`
- `axios.post(`
- `axios.put(`
- `axios.delete(`
- `http://localhost:8080`

## ✅ Testing After Migration

For each migrated component:
1. Login as appropriate user role
2. Navigate to the component
3. Verify API calls work correctly
4. Check browser console for errors
5. Verify token is being sent in request headers (check Network tab)

## 🚨 Common Issues

### Issue: "Cannot read property 'data' of undefined"
**Solution:** The response structure might have changed. Check if you need `response.data` or just `response`.

### Issue: Component redirects to login unexpectedly
**Solution:** 
1. Check if token exists: `localStorage.getItem('token')`
2. Verify token is not expired
3. Check backend logs for authentication errors

### Issue: CORS errors
**Solution:** Ensure backend CORS configuration allows requests from `http://localhost:3000`

## 📚 Additional Resources

- Main Integration Guide: `JWT_FRONTEND_INTEGRATION.md`
- Implementation Summary: `JWT_IMPLEMENTATION_SUMMARY.md`
- API Service Reference: `src/services/apiService.js`

---

**Need to add a new API endpoint?**

Edit `src/services/apiService.js` and add your method:

```javascript
// In apiService.js
const apiService = {
  // ... existing methods ...
  
  // Your new method
  getYourData: (id) => {
    return axiosInstance.get(`/api/your-endpoint/${id}`);
  },
};
```

Then use it in your component:
```javascript
import apiService from '../services/apiService';

const data = await apiService.getYourData(123);
```
