# 403 Forbidden Error - Quick Fix Guide

## 🚨 Problem
Getting **403 Forbidden** errors when trying to login or register.

---

## ✅ Solution (Backend Fix Required)

The 403 error means your **backend is blocking the requests**. This is a **backend configuration issue**, not a frontend issue.

### **Most Common Cause: Spring Security Configuration**

Your backend's Spring Security is requiring authentication for the login/register endpoints, which creates a catch-22 situation.

---

## 🔧 Backend Fix (Spring Boot)

### **Step 1: Update SecurityConfig.java**

Find your `SecurityConfig.java` file and update it:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS
            .cors().and()
            
            // Disable CSRF for API endpoints
            .csrf().disable()
            
            // Configure authorization
            .authorizeHttpRequests(auth -> auth
                // ✅ ALLOW these endpoints WITHOUT authentication
                .requestMatchers("/api/users/login").permitAll()
                .requestMatchers("/api/users/register").permitAll()
                .requestMatchers("/api/states/**").permitAll()
                .requestMatchers("/api/cities/**").permitAll()
                .requestMatchers("/api/bloodcomponents/**").permitAll()
                .requestMatchers("/api/roles/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Allow preflight
                
                // 🔒 REQUIRE authentication for all other endpoints
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow requests from React frontend
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        
        // Allow these HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### **Step 2: Restart Backend**

After making these changes:
1. Stop your backend server
2. Rebuild if necessary
3. Start your backend server again

---

## 🧪 Test if Backend is Fixed

### **Option 1: Use cURL (Command Line)**

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Expected Result:**
- ✅ Should return user data with JWT token (or "User Not Found" if user doesn't exist)
- ❌ Should NOT return 403 Forbidden

### **Option 2: Use Browser Console**

1. Open your React app in browser
2. Open DevTools (F12)
3. Go to Console tab
4. Run:

```javascript
fetch('http://localhost:8080/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', password: 'test123' })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e));
```

---

## 📋 Checklist

- [ ] Updated `SecurityConfig.java` with `permitAll()` for public endpoints
- [ ] Added CORS configuration
- [ ] Disabled CSRF for API endpoints
- [ ] Restarted backend server
- [ ] Tested with cURL - no 403 error
- [ ] Tested from React app - login works

---

## 🔍 Still Getting 403?

### **Check 1: Verify Security Config is Loaded**

Add this to your SecurityConfig:

```java
@PostConstruct
public void init() {
    System.out.println("✅ SecurityConfig loaded successfully");
}
```

You should see this message when backend starts.

### **Check 2: Check Backend Logs**

Look for errors like:
- `Access Denied`
- `Forbidden`
- `CORS`
- `Authentication required`

### **Check 3: Verify Endpoint Paths**

Make sure your controller paths match:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping("/login")  // This creates: /api/users/login
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // ...
    }
    
    @PostMapping("/register")  // This creates: /api/users/register
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // ...
    }
}
```

### **Check 4: Microservices Architecture**

If you're using microservices, **each service needs its own SecurityConfig**:

- **Auth Service (8080)** - Must allow `/api/users/login` and `/api/users/register`
- **HB Service (8081)** - Configure as needed
- **Donor Service (8082)** - Configure as needed

---

## 🆘 Alternative: Temporary Fix for Testing

**⚠️ WARNING: Only for development/testing!**

Temporarily allow ALL requests (no security):

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors().and()
        .csrf().disable()
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()  // ⚠️ ALLOW EVERYTHING
        );
    return http.build();
}
```

This will help you confirm if security is the issue. **DO NOT use in production!**

---

## 📞 Need More Help?

### **Share These Details:**

1. **Backend Framework:** Spring Boot version?
2. **Error in Browser Console:** Screenshot or copy the error
3. **Backend Console Logs:** Any errors when request comes in?
4. **cURL Test Result:** Does cURL return 403 or work?
5. **SecurityConfig:** Share your current SecurityConfig.java

### **Common Mistakes:**

❌ Forgot to add `@Configuration` annotation  
❌ SecurityConfig not in component scan path  
❌ Wrong endpoint path in `requestMatchers()`  
❌ CORS not enabled  
❌ CSRF blocking POST requests  

---

## ✅ Summary

**The 403 error is a BACKEND issue, not frontend.**

**Fix:**
1. Update `SecurityConfig.java` to allow public endpoints
2. Enable CORS
3. Disable CSRF for API
4. Restart backend

**Your frontend code is correct** - it's using `publicAuthAxios` which doesn't send authentication headers for login/register.

---

**Last Updated:** February 1, 2026  
**Status:** Awaiting backend configuration fix
