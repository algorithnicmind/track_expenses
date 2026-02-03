# 📡 API Documentation

## Personal Finance Manager - RESTful API Reference

---

## 🌐 Base URL

```
Development: http://localhost:5000/api/v1
Production:  https://your-domain.com/api/v1
```

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 📋 API Endpoints Overview

| Method | Endpoint         | Description        | Auth Required |
| ------ | ---------------- | ------------------ | :-----------: |
| POST   | `/auth/register` | Register new user  |      ❌       |
| POST   | `/auth/login`    | User login         |      ❌       |
| GET    | `/auth/profile`  | Get user profile   |      ✅       |
| GET    | `/expenses`      | Get all expenses   |      ✅       |
| POST   | `/expenses`      | Create expense     |      ✅       |
| GET    | `/expenses/:id`  | Get single expense |      ✅       |
| PUT    | `/expenses/:id`  | Update expense     |      ✅       |
| DELETE | `/expenses/:id`  | Delete expense     |      ✅       |

---

## 👤 Authentication Endpoints

### Register User

Create a new user account.

```http
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "error": "Email already exists"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| name | Required, 2-50 characters |
| email | Required, valid email format, unique |
| password | Required, minimum 6 characters |

---

### Login User

Authenticate a user and receive a JWT token.

```http
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get User Profile

Retrieve the authenticated user's profile.

```http
GET /api/v1/auth/profile
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 💰 Expense Endpoints

### Get All Expenses

Retrieve all expenses for the authenticated user.

```http
GET /api/v1/expenses
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | Number | Page number | 1 |
| limit | Number | Items per page | 10 |
| category | String | Filter by category | - |
| startDate | Date | Filter from date | - |
| endDate | Date | Filter to date | - |
| sort | String | Sort field | -createdAt |

**Example Request:**

```http
GET /api/v1/expenses?page=1&limit=10&category=food&sort=-date
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "total": 25
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Grocery Shopping",
      "amount": 150.5,
      "category": "food",
      "description": "Weekly groceries from supermarket",
      "date": "2024-01-15T00:00:00.000Z",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more expenses
  ]
}
```

---

### Create Expense

Add a new expense record.

```http
POST /api/v1/expenses
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Coffee Meeting",
  "amount": 25.0,
  "category": "food",
  "description": "Business meeting at Starbucks",
  "date": "2024-01-15"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Coffee Meeting",
    "amount": 25.0,
    "category": "food",
    "description": "Business meeting at Starbucks",
    "date": "2024-01-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T14:30:00.000Z"
  }
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| title | Required, 2-100 characters |
| amount | Required, positive number |
| category | Required, enum: food, transport, utilities, entertainment, shopping, health, education, other |
| description | Optional, max 500 characters |
| date | Optional, defaults to current date |

---

### Get Single Expense

Retrieve a specific expense by ID.

```http
GET /api/v1/expenses/:id
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Grocery Shopping",
    "amount": 150.5,
    "category": "food",
    "description": "Weekly groceries from supermarket",
    "date": "2024-01-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": "Expense not found"
}
```

---

### Update Expense

Update an existing expense.

```http
PUT /api/v1/expenses/:id
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body (partial update allowed):**

```json
{
  "title": "Updated Grocery Shopping",
  "amount": 175.0
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Expense updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Grocery Shopping",
    "amount": 175.0,
    "category": "food",
    "description": "Weekly groceries from supermarket",
    "date": "2024-01-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "updatedAt": "2024-01-16T09:00:00.000Z"
  }
}
```

---

### Delete Expense

Remove an expense record.

```http
DELETE /api/v1/expenses/:id
```

**Headers:**

```http
Authorization: Bearer <jwt_token>
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {}
}
```

---

## 📊 Analytics Endpoints (Future)

### Get Expense Summary

```http
GET /api/v1/expenses/summary
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalExpenses": 2500.0,
    "byCategory": {
      "food": 800.0,
      "transport": 350.0,
      "utilities": 500.0,
      "entertainment": 450.0,
      "other": 400.0
    },
    "monthlyTrend": [
      { "month": "Jan 2024", "total": 2500.0 },
      { "month": "Dec 2023", "total": 2800.0 }
    ]
  }
}
```

---

## ❌ Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": "Error message here",
  "details": [] // Optional: validation errors
}
```

### HTTP Status Codes

| Code | Description                              |
| ---- | ---------------------------------------- |
| 200  | Success                                  |
| 201  | Created                                  |
| 400  | Bad Request - Invalid input              |
| 401  | Unauthorized - Authentication required   |
| 403  | Forbidden - Access denied                |
| 404  | Not Found - Resource doesn't exist       |
| 422  | Unprocessable Entity - Validation failed |
| 500  | Internal Server Error                    |

### Validation Error Example

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## 🔑 Rate Limiting

To prevent abuse, the API implements rate limiting:

| Tier          | Requests | Window     |
| ------------- | -------- | ---------- |
| Anonymous     | 100      | 15 minutes |
| Authenticated | 1000     | 15 minutes |

**Rate Limit Headers:**

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642234567
```

---

## 📝 Example Usage

### cURL Examples

**Register:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Expenses:**

```bash
curl http://localhost:5000/api/v1/expenses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create Expense:**

```bash
curl -X POST http://localhost:5000/api/v1/expenses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Lunch","amount":15,"category":"food"}'
```

---

<div align="center">

**For more information, check the source code or contact the developer.**

</div>
