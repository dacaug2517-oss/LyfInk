# LyfInk JWT Authentication API Documentation

## Base URL
`http://localhost:8080/api`

---

## 1. Login Endpoint
Authenticates a user and returns a JWT token along with user details.

- **URL:** `/users/login`
- **Method:** `POST`
- **Access:** Public

### Request Body
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Success Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ...",
    "userid": 33,
    "email": "user@example.com",
    "rid": 3,
    "hbid": 0
}
```

### Error Response (500 Internal Server Error)
Occurs if password is invalid or user not found (managed by Global Exception Handler).
```json
{
    "timestamp": "2026-02-01T04:30:00.000+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Invalid Password!",
    "path": "/api/users/login"
}
```

---

## 2. Register Endpoint (User/Donor)
Registers a new user (Admin, Donor, or generic User).

- **URL:** `/users/register`
- **Method:** `POST`
- **Access:** Public

### Request Body (Donor Example)
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "mobno": "9876543210",
    "address": "123 Main St",
    "security_question": "Pet Name",
    "security_answer": "Fluffy",
    "rid": 2,          // 2 = Donor, 1 = Admin
    "stateid": 1,
    "cityid": 1,
    "donorDetails": {  // Only required if rid = 2
        "dob": "1990-01-01",
        "gender": "Male",
        "medical_history": "None",
        "bcid": 1
    }
}
```

### Success Response (200 OK)
Returns the created `Users` object.
```json
{
    "userid": 45,
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "$2a$10$...",
    "role": {
        "rid": 2,
        "rname": "donor"
    },
    "donor": {
        "did": 12,
        "dob": "1990-01-01",
        ...
    },
    ...
}
```

---

## 3. Register Endpoint (Hospital/Blood Bank)
Registers a Hospital or Blood Bank. This is a special case:
1. Ideally performed by an Admin (authenticated), OR
2. If public, the backend checks logic (currently `rid=3`).

- **URL:** `/users/register`
- **Method:** `POST`
- **Access:** Public

### Request Body
```json
{
    "rid": 3,
    "hbDetails": {
        "hb_name": "City Hospital",
        "hb_email": "contact@cityhospital.com",
        "hb_password": "securepassword",
        "hb_phno": "022-12345678",
        "reg_no": "REG123456",
        "gst_no": "GST98765",
        "type": "hospital"
    }
}
```

---

## 4. Authenticated Endpoints
To access any protected endpoint, you must include the JWT token in the header.

- **Header Name:** `Authorization`
- **Header Value:** `Bearer <your_token_here>`

### Example: Get User Profile
- **URL:** `/users/{id}` (e.g., `/users/33`)
- **Method:** `GET`
- **Headers:**
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
  ```
