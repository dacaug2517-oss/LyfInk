# Microservices Architecture - Visual Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                             │
│                      http://localhost:3000                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │              src/utils/axiosInstance.js                     │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │    │
│  │  │authService   │  │hbService     │  │donorService  │     │    │
│  │  │Axios         │  │Axios         │  │Axios         │     │    │
│  │  │:8080         │  │:8081         │  │:8082         │     │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │    │
│  └─────────┼──────────────────┼──────────────────┼────────────┘    │
│            │                  │                  │                  │
└────────────┼──────────────────┼──────────────────┼──────────────────┘
             │                  │                  │
             │ JWT Token        │ JWT Token        │ JWT Token
             │ in Header        │ in Header        │ in Header
             │                  │                  │
┌────────────▼────────┐ ┌───────▼──────────┐ ┌────▼─────────────────┐
│  AUTH SERVICE       │ │  HB SERVICE      │ │  DONOR SERVICE       │
│  Port: 8080         │ │  Port: 8081      │ │  Port: 8082          │
├─────────────────────┤ ├──────────────────┤ ├──────────────────────┤
│ • User Login        │ │ • Hospital Mgmt  │ │ • Donor Profile      │
│ • User Register     │ │ • Blood Stock    │ │ • Donation History   │
│ • Blood Components  │ │ • Blood Requests │ │ • Profile Updates    │
│ • States/Cities     │ │ • Donation Camps │ │                      │
└─────────────────────┘ └──────────────────┘ └──────────────────────┘
         │                       │                      │
         └───────────────────────┴──────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Shared JWT Secret     │
                    │   (All services use     │
                    │    same secret key)     │
                    └─────────────────────────┘
```

## Request Flow by Service

### 1. Login Flow (Auth Service - 8080)

```
┌──────────┐
│  User    │
└────┬─────┘
     │ Enter credentials
     ▼
┌─────────────────┐
│ Login Component │
└────┬────────────┘
     │ authService.login()
     ▼
┌──────────────────┐
│ authServiceAxios │
│ (Port 8080)      │
└────┬─────────────┘
     │ POST /api/users/login
     ▼
┌──────────────────┐
│  Auth Service    │
│  :8080           │
│ • Validate creds │
│ • Generate JWT   │
└────┬─────────────┘
     │ Return JWT token
     ▼
┌──────────────────┐
│  localStorage    │
│  token: "eyJ..." │
└──────────────────┘
```

### 2. Donor Profile Flow (Donor Service - 8082)

```
┌──────────────────┐
│ Donor Dashboard  │
└────┬─────────────┘
     │ apiService.getDonorProfile(123)
     ▼
┌──────────────────┐
│ donorServiceAxios│
│ (Port 8082)      │
└────┬─────────────┘
     │ Add JWT token from localStorage
     │ GET /api/donor/profile/123
     │ Authorization: Bearer eyJ...
     ▼
┌──────────────────┐
│  Donor Service   │
│  :8082           │
│ • Validate JWT   │
│ • Fetch profile  │
└────┬─────────────┘
     │ Return profile data
     ▼
┌──────────────────┐
│ Donor Dashboard  │
│ Display profile  │
└──────────────────┘
```

### 3. Blood Request Flow (HB Service - 8081)

```
┌──────────────────────┐
│ Hospital Dashboard   │
└────┬─────────────────┘
     │ apiService.createBloodRequest(data)
     ▼
┌──────────────────┐
│ hbServiceAxios   │
│ (Port 8081)      │
└────┬─────────────┘
     │ Add JWT token from localStorage
     │ POST /api/bloodrequests
     │ Authorization: Bearer eyJ...
     ▼
┌──────────────────┐
│  HB Service      │
│  :8081           │
│ • Validate JWT   │
│ • Create request │
└────┬─────────────┘
     │ Return success
     ▼
┌──────────────────────┐
│ Hospital Dashboard   │
│ Show confirmation    │
└──────────────────────┘
```

## Service Endpoint Mapping

```
┌─────────────────────────────────────────────────────────────────┐
│                    API ENDPOINT ROUTING                          │
└─────────────────────────────────────────────────────────────────┘

AUTH SERVICE (:8080)
├── /api/users/register
├── /api/users/login
├── /api/bloodcomponents
├── /api/bloodcomponents/category/{id}
├── /api/states/all
└── /api/cities/bystate/{stateId}

HB SERVICE (:8081)
├── /api/hb/register
├── /api/hb/{hbid}
├── /api/BloodStock
├── /api/blood-stock/update
├── /api/bloodrequests
└── /api/donationcamps

DONOR SERVICE (:8082)
├── /api/donor/profile/{userId}
├── /api/donor/history/{userId}
└── /api/donor/profile/{userId} (PUT)
```

## Component to Service Mapping

```
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND COMPONENTS                            │
└─────────────────────────────────────────────────────────────────┘

BloodBankLogin.jsx
    └─▶ authService.login()
        └─▶ authServiceAxios (:8080)
            └─▶ POST /api/users/login

DonorRegister.jsx
    ├─▶ authService.register()
    │   └─▶ authServiceAxios (:8080)
    │       └─▶ POST /api/users/register
    │
    ├─▶ apiService.getAllStates()
    │   └─▶ authServiceAxios (:8080)
    │       └─▶ GET /api/states/all
    │
    └─▶ apiService.getBloodComponents()
        └─▶ authServiceAxios (:8080)
            └─▶ GET /api/bloodcomponents

DonorProfile.jsx
    ├─▶ apiService.getDonorProfile(userId)
    │   └─▶ donorServiceAxios (:8082)
    │       └─▶ GET /api/donor/profile/{userId}
    │
    └─▶ apiService.getDonorHistory(userId)
        └─▶ donorServiceAxios (:8082)
            └─▶ GET /api/donor/history/{userId}

HospitalDashboard.jsx
    ├─▶ apiService.getBloodStock()
    │   └─▶ hbServiceAxios (:8081)
    │       └─▶ GET /api/BloodStock
    │
    └─▶ apiService.getBloodRequests()
        └─▶ hbServiceAxios (:8081)
            └─▶ GET /api/bloodrequests

RegisterHospital.jsx
    ├─▶ apiService.getAllStates()
    │   └─▶ authServiceAxios (:8080)
    │       └─▶ GET /api/states/all
    │
    └─▶ apiService.registerHospital(data)
        └─▶ hbServiceAxios (:8081)
            └─▶ POST /api/hb/register
```

## JWT Token Flow Across Services

```
┌─────────────────────────────────────────────────────────────────┐
│                    JWT TOKEN LIFECYCLE                           │
└─────────────────────────────────────────────────────────────────┘

1. LOGIN
   User → Auth Service (:8080) → Generate JWT → Return to Frontend
                                                        ↓
2. STORE                                    localStorage.setItem('token', jwt)
                                                        ↓
3. USE IN ALL SERVICES
   ┌────────────────────────────────────────────────────┐
   │                                                     │
   ├─▶ Request to Auth Service (:8080)                 │
   │   Header: Authorization: Bearer {token}           │
   │                                                     │
   ├─▶ Request to HB Service (:8081)                   │
   │   Header: Authorization: Bearer {token}           │
   │                                                     │
   └─▶ Request to Donor Service (:8082)                │
       Header: Authorization: Bearer {token}           │
                                                        │
4. VALIDATE                                             │
   Each service validates the token independently       │
   using the shared JWT secret                          │
                                                        │
5. EXPIRE/LOGOUT                                        │
   Token expires (10 hours) OR user logs out           │
   → localStorage.removeItem('token')                   │
   → Redirect to /login                                 │
   └────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING                                │
└─────────────────────────────────────────────────────────────────┘

Component makes API call
    ↓
axiosInstance (any service)
    ↓
Request sent with JWT token
    ↓
Backend Service (8080/8081/8082)
    ↓
    ├─ Token Valid ──────────▶ Return Data ──────────▶ Success
    │
    └─ Token Invalid/Expired ─▶ Return 401 ─┐
                                             ↓
                              Response Interceptor
                                             ↓
                              Clear localStorage
                                             ↓
                              Redirect to /login
```

## Service Communication Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│              MICROSERVICES COMMUNICATION                         │
└─────────────────────────────────────────────────────────────────┘

Frontend acts as API Gateway:
• No direct service-to-service communication
• All requests go through frontend
• Frontend routes to appropriate service

┌──────────┐
│ Frontend │
└────┬─────┘
     │
     ├─────────────────┐
     │                 │
     ▼                 ▼
┌─────────┐       ┌─────────┐
│Service A│       │Service B│
└─────────┘       └─────────┘
     ↑                 ↑
     │                 │
     └─────────┬───────┘
               │
          Independent
         (No direct
        communication)
```

## Development vs Production URLs

```
DEVELOPMENT:
┌──────────────────────────────────────┐
│ Auth:  http://localhost:8080         │
│ HB:    http://localhost:8081         │
│ Donor: http://localhost:8082         │
└──────────────────────────────────────┘

PRODUCTION (Example):
┌──────────────────────────────────────┐
│ Auth:  https://api.lyfink.com/auth   │
│ HB:    https://api.lyfink.com/hb     │
│ Donor: https://api.lyfink.com/donor  │
└──────────────────────────────────────┘

Configuration in axiosInstance.js
```

---

**Legend:**
- `─▶` : Data flow / API call
- `│` : Vertical connection
- `┌─┐` : Component/Service boundary
- `▼` : Flow direction
- `:8080` : Port number
