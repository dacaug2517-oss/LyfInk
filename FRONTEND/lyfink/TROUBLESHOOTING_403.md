# 403 Forbidden Error - Troubleshooting Guide

## Issue
Getting **403 Forbidden** errors on login and register endpoints.

## Possible Causes & Solutions

### 1. **Backend CORS Configuration**

**Problem:** Backend is blocking requests from `http://localhost:3000`

**Solution:** Add CORS configuration to your backend:

#### For Spring Boot (Java):

**Option A: Add to Controller**
```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {
    // ... your endpoints
}
```

**Option B: Global CORS Configuration**
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**Option C: Security Configuration (if using Spring Security)**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/login", "/api/users/register").permitAll()
                .requestMatchers("/api/states/**", "/api/cities/**").permitAll()
                .requestMatchers("/api/bloodcomponents/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

### 2. **Missing Public Endpoints in Security Config**

**Problem:** Backend security is requiring authentication for login/register

**Solution:** Ensure these endpoints are marked as **permitAll()**:

```java
.requestMatchers("/api/users/login").permitAll()
.requestMatchers("/api/users/register").permitAll()
.requestMatchers("/api/states/**").permitAll()
.requestMatchers("/api/cities/**").permitAll()
.requestMatchers("/api/bloodcomponents/**").permitAll()
.requestMatchers("/api/roles/**").permitAll()
```

---

### 3. **CSRF Token Required**

**Problem:** Backend requires CSRF token for POST requests

**Solution:** Disable CSRF for API endpoints:

```java
http.csrf().disable()
```

Or configure CSRF to ignore API endpoints:

```java
http.csrf()
    .ignoringRequestMatchers("/api/**")
```

---

### 4. **Preflight OPTIONS Request Failing**

**Problem:** Browser sends OPTIONS request before POST, and it's being blocked

**Solution:** Allow OPTIONS method in CORS:

```java
.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
```

And in Security Config:
```java
.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
```

---

### 5. **Wrong Content-Type Header**

**Problem:** Backend expects specific content type

**Solution:** Already set in our axios instance, but verify:

```javascript
headers: {
  'Content-Type': 'application/json',
}
```

---

## Testing Steps

### 1. Test with cURL (bypasses CORS)

```bash
# Test Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test Register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Test","lastname":"User","email":"test@example.com","password":"password123","mobno":1234567890,"address":"Test Address","security_question":"Test?","security_answer":"Test","rid":2,"stateid":1,"cityid":1}'
```

**If cURL works:** It's a CORS issue  
**If cURL fails:** It's a backend security/configuration issue

---

### 2. Check Browser Console

Open browser DevTools (F12) → Network tab:
- Look for the failed request
- Check the **Response Headers**
- Look for CORS errors in Console tab

---

### 3. Check Backend Logs

Look for:
- `403 Forbidden` errors
- `CORS` related errors
- `Access Denied` messages
- `Authentication` errors

---

## Quick Fix for Development

**Temporarily disable security for testing:**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // ⚠️ ALLOW ALL - FOR TESTING ONLY
            );
        return http.build();
    }
}
```

⚠️ **WARNING:** Only use this for testing! Re-enable security for production.

---

## Frontend Verification

### Check if publicAuthAxios is being used:

```javascript
// In src/services/authService.js
console.log('Using publicAuthAxios for login');
const response = await publicAuthAxios.post('/api/users/login', {
  email,
  password,
});
```

### Check the request in browser:

1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Click on the failed request
5. Check:
   - **Request URL:** Should be `http://localhost:8080/api/users/login`
   - **Request Method:** Should be `POST`
   - **Request Headers:** Should have `Content-Type: application/json`
   - **Request Headers:** Should NOT have `Authorization` header (for login)
   - **Response:** Check the error message

---

## Most Likely Solution

Based on the 403 error, the most likely issue is:

**Backend Security Configuration is blocking public endpoints**

### Fix:

1. Open your backend `SecurityConfig.java`
2. Add these lines:

```java
.requestMatchers("/api/users/login").permitAll()
.requestMatchers("/api/users/register").permitAll()
```

3. Ensure CORS is enabled:

```java
http.cors().and()
```

4. Restart backend server

---

## Still Not Working?

### Share these details:

1. **Backend Framework:** Spring Boot version?
2. **Error Message:** Exact error from browser console
3. **Backend Logs:** Any errors in backend console?
4. **cURL Test:** Does cURL work?
5. **CORS Headers:** What headers are returned in the response?

---

**Last Updated:** February 1, 2026  
**Status:** Troubleshooting 403 errors
