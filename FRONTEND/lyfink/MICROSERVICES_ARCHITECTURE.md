# Microservices Architecture - API Configuration

## 🏗️ Architecture Overview

The LyfInk application uses a **microservices architecture** with three separate backend services:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                   http://localhost:3000                      │
└────────────┬────────────┬────────────┬──────────────────────┘
             │            │            │
             │            │            │
    ┌────────▼────┐  ┌───▼─────┐  ┌──▼──────────┐
    │   Auth      │  │   HB    │  │   Donor     │
    │  Service    │  │ Service │  │  Service    │
    │   :8080     │  │  :8081  │  │   :8082     │
    └─────────────┘  └─────────┘  └─────────────┘
```

---

## 🔌 Microservices Breakdown

### 1. **Auth Service** - Port 8080
**Base URL:** `http://localhost:8080`

**Responsibilities:**
- User authentication (login/register)
- User management
- Blood components data
- States and cities data
- Common/shared data

**Endpoints:**
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login (returns JWT)
- `GET /api/bloodcomponents` - Get all blood components
- `GET /api/bloodcomponents/category/{id}` - Get blood components by category
- `GET /api/states/all` - Get all states
- `GET /api/cities/bystate/{stateId}` - Get cities by state

---

### 2. **Hospital/Blood Bank Service** - Port 8081
**Base URL:** `http://localhost:8081`

**Responsibilities:**
- Hospital/Blood Bank management
- Blood stock management
- Blood requests
- Donation camps

**Endpoints:**
- `POST /api/hb/register` - Register hospital/blood bank
- `GET /api/hb/{hbid}` - Get hospital details
- `GET /api/BloodStock` - Get blood stock
- `POST /api/blood-stock/update` - Update blood stock
- `POST /api/bloodrequests` - Create blood request
- `GET /api/bloodrequests` - Get blood requests
- `POST /api/donationcamps` - Create donation camp
- `GET /api/donationcamps` - Get donation camps

---

### 3. **Donor Service** - Port 8082
**Base URL:** `http://localhost:8082`

**Responsibilities:**
- Donor profile management
- Donor donation history
- Donor-specific operations

**Endpoints:**
- `GET /api/donor/profile/{userId}` - Get donor profile
- `GET /api/donor/history/{userId}` - Get donor donation history
- `PUT /api/donor/profile/{userId}` - Update donor profile

---

## 📂 Frontend Service Configuration

### File: `src/utils/axiosInstance.js`

This file creates three separate axios instances, one for each microservice:

```javascript
// Microservice URLs
const AUTH_SERVICE_URL = 'http://localhost:8080';
const HB_SERVICE_URL = 'http://localhost:8081';
const DONOR_SERVICE_URL = 'http://localhost:8082';

// Exported instances
export const authServiceAxios = createAxiosInstance(AUTH_SERVICE_URL);
export const hbServiceAxios = createAxiosInstance(HB_SERVICE_URL);
export const donorServiceAxios = createAxiosInstance(DONOR_SERVICE_URL);
```

Each instance includes:
- ✅ JWT token interceptor (adds token to requests)
- ✅ 401 error handler (redirects to login on unauthorized)
- ✅ Proper headers configuration

---

## 🎯 Service Mapping

### Auth Service (8080)
**Used by:**
- `authService.js` - Login/Register
- `apiService.js` - Blood components, States, Cities

### HB Service (8081)
**Used by:**
- `HbService.js` - Hospital registration
- `apiService.js` - Blood stock, Blood requests, Donation camps

### Donor Service (8082)
**Used by:**
- `apiService.js` - Donor profile, Donor history

---

## 💻 Usage Examples

### Example 1: Login (Auth Service - 8080)
```javascript
import authService from './services/authService';

const handleLogin = async () => {
  const response = await authService.login(email, password);
  // Calls: http://localhost:8080/api/users/login
};
```

### Example 2: Get Donor Profile (Donor Service - 8082)
```javascript
import apiService from './services/apiService';

const fetchProfile = async (userId) => {
  const response = await apiService.getDonorProfile(userId);
  // Calls: http://localhost:8082/api/donor/profile/{userId}
};
```

### Example 3: Create Blood Request (HB Service - 8081)
```javascript
import apiService from './services/apiService';

const createRequest = async (data) => {
  const response = await apiService.createBloodRequest(data);
  // Calls: http://localhost:8081/api/bloodrequests
};
```

### Example 4: Get States (Auth Service - 8080)
```javascript
import apiService from './services/apiService';

const fetchStates = async () => {
  const response = await apiService.getAllStates();
  // Calls: http://localhost:8080/api/states/all
};
```

---

## 🔐 JWT Authentication Flow

All three microservices use the same JWT token for authentication:

```
1. User logs in via Auth Service (8080)
   ↓
2. Auth Service returns JWT token
   ↓
3. Token stored in localStorage
   ↓
4. All subsequent requests to ANY microservice include the token
   ↓
5. Each microservice validates the token independently
```

**Important:** The JWT token is shared across all microservices. Each service must have the same JWT secret key for validation.

---

## 🛠️ Configuration

### Changing Microservice URLs

If your microservices are running on different ports or hosts, update `src/utils/axiosInstance.js`:

```javascript
// Example: Production URLs
const AUTH_SERVICE_URL = 'https://api.lyfink.com/auth';
const HB_SERVICE_URL = 'https://api.lyfink.com/hb';
const DONOR_SERVICE_URL = 'https://api.lyfink.com/donor';
```

### Environment Variables (Recommended)

For better configuration management, use environment variables:

```javascript
// .env file
REACT_APP_AUTH_SERVICE_URL=http://localhost:8080
REACT_APP_HB_SERVICE_URL=http://localhost:8081
REACT_APP_DONOR_SERVICE_URL=http://localhost:8082

// axiosInstance.js
const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;
const HB_SERVICE_URL = process.env.REACT_APP_HB_SERVICE_URL;
const DONOR_SERVICE_URL = process.env.REACT_APP_DONOR_SERVICE_URL;
```

---

## 📊 API Endpoint Distribution

| Endpoint | Service | Port |
|----------|---------|------|
| `/api/users/*` | Auth | 8080 |
| `/api/bloodcomponents/*` | Auth | 8080 |
| `/api/states/*` | Auth | 8080 |
| `/api/cities/*` | Auth | 8080 |
| `/api/hb/*` | HB | 8081 |
| `/api/BloodStock` | HB | 8081 |
| `/api/bloodrequests` | HB | 8081 |
| `/api/donationcamps` | HB | 8081 |
| `/api/donor/*` | Donor | 8082 |

---

## 🧪 Testing Microservices

### Check if all services are running:

```bash
# Auth Service
curl http://localhost:8080/api/users/login

# HB Service
curl http://localhost:8081/api/BloodStock

# Donor Service
curl http://localhost:8082/api/donor/profile/1
```

### Browser Console Testing:

```javascript
// Test Auth Service
localStorage.getItem('token'); // Should show JWT token

// Test API calls
import apiService from './services/apiService';

// Auth Service (8080)
await apiService.getAllStates();

// HB Service (8081)
await apiService.getBloodStock();

// Donor Service (8082)
await apiService.getDonorProfile(123);
```

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "ERR_CONNECTION_REFUSED"

**Cause:** One or more microservices are not running.

**Solution:**
1. Check if all three services are running:
   - Auth Service on port 8080
   - HB Service on port 8081
   - Donor Service on port 8082
2. Verify no port conflicts
3. Check firewall settings

---

### Issue: "401 Unauthorized" on specific service

**Cause:** JWT token validation failing on that microservice.

**Solution:**
1. Ensure all microservices use the same JWT secret key
2. Check token expiration (10 hours)
3. Verify token is being sent in request headers
4. Check backend logs for that specific service

---

### Issue: CORS errors

**Cause:** Microservice not configured to accept requests from frontend.

**Solution:**
Add CORS configuration to each microservice:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

Or configure globally in each service's security config.

---

## 📝 Summary

✅ **Three microservices** running on different ports
✅ **Shared JWT authentication** across all services
✅ **Automatic routing** via apiService
✅ **Centralized configuration** in axiosInstance.js
✅ **Consistent error handling** across all services

---

## 🔄 Migration from Monolith

If you were previously using a single backend on port 8080, the changes are:

**Before:**
```javascript
// All requests went to localhost:8080
axios.get('http://localhost:8080/api/donor/profile/1');
```

**After:**
```javascript
// Requests automatically routed to correct service
apiService.getDonorProfile(1); // → localhost:8082
```

---

**Last Updated:** February 1, 2026  
**Status:** ✅ Microservices configured and ready
