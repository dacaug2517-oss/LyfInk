# 🚀 Microservices Quick Reference

## Service Ports

| Service | Port | Base URL |
|---------|------|----------|
| **Auth** | 8080 | `http://localhost:8080` |
| **HB** | 8081 | `http://localhost:8081` |
| **Donor** | 8082 | `http://localhost:8082` |

---

## Import Statements

```javascript
// For authentication (login/register)
import authService from './services/authService';

// For all API calls
import apiService from './services/apiService';

// For specific axios instances (advanced)
import { authServiceAxios, hbServiceAxios, donorServiceAxios } from './utils/axiosInstance';
```

---

## Common API Calls

### Authentication (Port 8080)
```javascript
// Login
await authService.login(email, password);

// Register
await authService.register(userData);

// Logout
authService.logout();

// Check if logged in
authService.isAuthenticated();

// Get current user
authService.getCurrentUser();
```

### Blood Components (Port 8080)
```javascript
// Get all blood components
await apiService.getBloodComponents();

// Get by category
await apiService.getBloodComponentsByCategory(categoryId);
```

### States & Cities (Port 8080)
```javascript
// Get all states
await apiService.getAllStates();

// Get cities by state
await apiService.getCitiesByState(stateId);
```

### Donor Operations (Port 8082)
```javascript
// Get donor profile
await apiService.getDonorProfile(userId);

// Get donor history
await apiService.getDonorHistory(userId);

// Update donor profile
await apiService.updateDonorProfile(userId, data);
```

### Hospital/Blood Bank (Port 8081)
```javascript
// Register hospital
await apiService.registerHospital(data);

// Get hospital details
await apiService.getHospitalDetails(hbid);

// Get blood stock
await apiService.getBloodStock();

// Update blood stock
await apiService.updateBloodStock(data);

// Create blood request
await apiService.createBloodRequest(data);

// Get blood requests
await apiService.getBloodRequests();

// Create donation camp
await apiService.createDonationCamp(data);

// Get donation camps
await apiService.getDonationCamps();
```

---

## Which Service for Which Endpoint?

### Auth Service (8080) 🔐
- `/api/users/*` - User management
- `/api/bloodcomponents/*` - Blood components
- `/api/states/*` - States
- `/api/cities/*` - Cities

### HB Service (8081) 🏥
- `/api/hb/*` - Hospital/Blood Bank
- `/api/BloodStock` - Blood stock
- `/api/bloodrequests` - Blood requests
- `/api/donationcamps` - Donation camps

### Donor Service (8082) 🩸
- `/api/donor/*` - Donor operations

---

## Error Handling

```javascript
try {
  const response = await apiService.getDonorProfile(userId);
  console.log(response.data);
} catch (error) {
  console.error('Error:', error);
  // User automatically redirected to login if 401
}
```

---

## Checking Service Status

### Browser Console
```javascript
// Check if token exists
localStorage.getItem('token');

// Check user info
JSON.parse(localStorage.getItem('user'));

// Test API call
await apiService.getAllStates();
```

### Command Line
```bash
# Test Auth Service
curl http://localhost:8080/api/states/all

# Test HB Service
curl http://localhost:8081/api/BloodStock

# Test Donor Service
curl http://localhost:8082/api/donor/profile/1
```

---

## Common Issues & Solutions

### ❌ "Network Error"
**Problem:** Service not running  
**Solution:** Start the microservice on the correct port

### ❌ "401 Unauthorized"
**Problem:** Token invalid/expired  
**Solution:** Login again to get new token

### ❌ "CORS Error"
**Problem:** Backend CORS not configured  
**Solution:** Add `@CrossOrigin("*")` to backend controllers

### ❌ Wrong data returned
**Problem:** Calling wrong service  
**Solution:** Check `apiService.js` to see which service the endpoint uses

---

## File Locations

```
src/
├── utils/
│   └── axiosInstance.js          ← Service URLs & interceptors
├── services/
│   ├── authService.js            ← Login/Register (8080)
│   ├── apiService.js             ← All API calls (routes to correct service)
│   ├── HbService.js              ← Hospital service (8081)
│   └── UserService.js            ← User service (8080)
└── components/
    ├── BloodBankLogin.jsx        ← Uses authService
    ├── DonorProfile.jsx          ← Uses apiService (8082)
    └── HospitalDashboard.jsx     ← Uses apiService (8081)
```

---

## Environment Variables (Optional)

Create `.env` file:
```env
REACT_APP_AUTH_SERVICE_URL=http://localhost:8080
REACT_APP_HB_SERVICE_URL=http://localhost:8081
REACT_APP_DONOR_SERVICE_URL=http://localhost:8082
```

Update `axiosInstance.js`:
```javascript
const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:8080';
const HB_SERVICE_URL = process.env.REACT_APP_HB_SERVICE_URL || 'http://localhost:8081';
const DONOR_SERVICE_URL = process.env.REACT_APP_DONOR_SERVICE_URL || 'http://localhost:8082';
```

---

## Testing Checklist

- [ ] All three services running (8080, 8081, 8082)
- [ ] Can login successfully
- [ ] Token stored in localStorage
- [ ] Can access donor profile (8082)
- [ ] Can access blood stock (8081)
- [ ] Can get states list (8080)
- [ ] 401 redirects to login
- [ ] Logout clears token

---

## Quick Debugging

```javascript
// 1. Check token
console.log('Token:', localStorage.getItem('token'));

// 2. Check user
console.log('User:', JSON.parse(localStorage.getItem('user')));

// 3. Test each service
console.log('Auth Service:', await apiService.getAllStates());
console.log('HB Service:', await apiService.getBloodStock());
console.log('Donor Service:', await apiService.getDonorProfile(123));
```

---

## Documentation Files

- `MICROSERVICES_ARCHITECTURE.md` - Full architecture guide
- `MICROSERVICES_DIAGRAMS.md` - Visual diagrams
- `JWT_IMPLEMENTATION_SUMMARY.md` - JWT implementation
- `QUICK_START_JWT.md` - JWT quick start

---

**Last Updated:** February 1, 2026  
**Status:** ✅ Ready to use
