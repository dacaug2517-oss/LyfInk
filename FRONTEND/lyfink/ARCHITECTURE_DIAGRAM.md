# JWT Authentication Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         ┌──────────────┐                     │
│  │   Login      │────────▶│ authService  │                     │
│  │  Component   │         │  .login()    │                     │
│  └──────────────┘         └──────┬───────┘                     │
│                                   │                              │
│                                   ▼                              │
│                          ┌─────────────────┐                    │
│                          │  axiosInstance  │                    │
│                          │  (JWT Handler)  │                    │
│                          └────────┬────────┘                    │
│                                   │                              │
│  ┌──────────────────────────────┼──────────────────────────┐  │
│  │         Request Interceptor   │                          │  │
│  │  • Adds "Authorization: Bearer <token>" to headers      │  │
│  └──────────────────────────────┬──────────────────────────┘  │
│                                   │                              │
└───────────────────────────────────┼──────────────────────────────┘
                                    │
                                    ▼
                          ┌─────────────────┐
                          │   HTTP REQUEST  │
                          │  with JWT Token │
                          └────────┬────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Spring Boot)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  JWT Filter      │────────▶│  Validate Token  │            │
│  │  (Interceptor)   │         │  Check Expiry    │            │
│  └──────────────────┘         └────────┬─────────┘            │
│                                         │                        │
│                          ┌──────────────┴──────────────┐        │
│                          │                             │        │
│                    Valid │                       Invalid│        │
│                          ▼                             ▼        │
│                  ┌──────────────┐           ┌──────────────┐   │
│                  │   Process    │           │  Return 401  │   │
│                  │   Request    │           │ Unauthorized │   │
│                  └──────┬───────┘           └──────┬───────┘   │
│                          │                          │           │
└──────────────────────────┼──────────────────────────┼───────────┘
                           │                          │
                           ▼                          ▼
                  ┌──────────────┐           ┌──────────────┐
                  │  Return Data │           │ Return Error │
                  └──────┬───────┘           └──────┬───────┘
                           │                          │
┌──────────────────────────┼──────────────────────────┼───────────┐
│                          ▼                          ▼            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Response Interceptor                             │  │
│  │  • If 401: Clear localStorage & redirect to /login      │  │
│  │  • Otherwise: Return response to component               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│                  ┌──────────────┐                               │
│                  │  Component   │                               │
│                  │  Receives    │                               │
│                  │  Data        │                               │
│                  └──────────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Enter credentials
     ▼
┌─────────────────┐
│ Login Component │
└────┬────────────┘
     │
     │ 2. authService.login(email, password)
     ▼
┌──────────────┐
│ authService  │
└────┬─────────┘
     │
     │ 3. POST /api/users/login
     ▼
┌──────────────┐
│   Backend    │
└────┬─────────┘
     │
     │ 4. Validate credentials
     │ 5. Generate JWT token
     ▼
┌──────────────┐
│   Response   │
│  { token,    │
│    userid,   │
│    rid }     │
└────┬─────────┘
     │
     │ 6. Store in localStorage
     ▼
┌──────────────────┐
│  localStorage    │
│  • token         │
│  • user (JSON)   │
└────┬─────────────┘
     │
     │ 7. Redirect to dashboard
     ▼
┌──────────────────┐
│   Dashboard      │
│   (Protected)    │
└──────────────────┘
```

## Protected Route Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ Navigate to /admin-dashboard
     ▼
┌──────────────────┐
│ ProtectedRoute   │
│  Component       │
└────┬─────────────┘
     │
     │ Check: isAuthenticated()?
     ├─────────────┬─────────────┐
     │             │             │
    NO            YES            │
     │             │             │
     ▼             ▼             │
┌─────────┐  Check: hasRole()?  │
│ /login  │       │             │
└─────────┘       ├─────────┬───┘
                  │         │
                 YES       NO
                  │         │
                  ▼         ▼
            ┌──────────┐ ┌──────────────┐
            │Dashboard │ │/unauthorized │
            └──────────┘ └──────────────┘
```

## API Request Flow

```
┌──────────────┐
│  Component   │
└────┬─────────┘
     │
     │ apiService.getDonorProfile(123)
     ▼
┌──────────────┐
│ apiService   │
└────┬─────────┘
     │
     │ axiosInstance.get('/api/donor/profile/123')
     ▼
┌──────────────────┐
│ Request          │
│ Interceptor      │
│ • Get token from │
│   localStorage   │
│ • Add to header  │
└────┬─────────────┘
     │
     │ GET /api/donor/profile/123
     │ Authorization: Bearer eyJhbGc...
     ▼
┌──────────────┐
│   Backend    │
│ • Validate   │
│   token      │
│ • Return     │
│   data       │
└────┬─────────┘
     │
     │ Response
     ▼
┌──────────────────┐
│ Response         │
│ Interceptor      │
│ • Check status   │
│ • Handle 401     │
└────┬─────────────┘
     │
     │ Data
     ▼
┌──────────────┐
│  Component   │
│  Updates UI  │
└──────────────┘
```

## File Dependencies

```
App.js
  ├─▶ ProtectedRoute.jsx
  │     └─▶ authService.js
  │           └─▶ axiosInstance.js
  │
  ├─▶ BloodBankLogin.jsx
  │     └─▶ authService.js
  │           └─▶ axiosInstance.js
  │
  └─▶ Dashboard Components
        └─▶ apiService.js
              └─▶ axiosInstance.js
```

## Data Flow: Login to API Call

```
1. LOGIN
   User → Login Component → authService → Backend
   Backend → JWT Token → localStorage

2. NAVIGATE
   User → Protected Route → Check Auth → Allow/Deny

3. API CALL
   Component → apiService → axiosInstance
   axiosInstance → Add Token → Backend
   Backend → Validate → Return Data
   Data → Component → Update UI

4. TOKEN EXPIRED
   Component → apiService → axiosInstance → Backend
   Backend → 401 Error → Response Interceptor
   Interceptor → Clear Storage → Redirect to Login
```

## Security Layers

```
┌─────────────────────────────────────────┐
│         Layer 1: Route Protection       │
│  ProtectedRoute checks authentication   │
│  before rendering component              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Layer 2: Role-Based Access         │
│  ProtectedRoute checks user role        │
│  matches allowed roles                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Layer 3: JWT Token in Request      │
│  axiosInstance adds token to all        │
│  API requests automatically              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Layer 4: Backend Token Validation    │
│  Backend validates token on every       │
│  request to protected endpoints          │
└─────────────────────────────────────────┘
```

## Token Lifecycle

```
┌──────────────┐
│  User Login  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Token Generated  │
│ (Backend)        │
│ Expires: 10hrs   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Stored in        │
│ localStorage     │
└──────┬───────────┘
       │
       │ ┌─────────────────────┐
       ├─▶ Used in API calls   │
       │ └─────────────────────┘
       │
       │ ┌─────────────────────┐
       ├─▶ Checked by routes   │
       │ └─────────────────────┘
       │
       ▼
┌──────────────────┐
│ Token Expires    │
│ or User Logout   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Removed from     │
│ localStorage     │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Redirect to      │
│ /login           │
└──────────────────┘
```

---

**Legend:**
- `─▶` : Data flow / Function call
- `│` : Vertical connection
- `┌─┐` : Component/Module boundary
- `▼` : Flow direction
