# 🛠️ Personal Finance Manager - Developer Guide

Welcome to the technical documentation for the Personal Finance Manager. This guide provides an in-depth look at the system architecture, technology stack, and API design.

---

## 🏗️ System Architecture

Personal Finance Manager is built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) following a Client-Server architecture.

### High-Level Overview

```
[Client / Frontend]      [Server / Backend]       [Database]
   React.js 18  <------>  Node.js / Express  <--->  MongoDB
   (Vercel)               (Render)                  (Atlas)
```

1.  **Frontend (Client)**: A React Single Page Application (SPA) that interacts with the backend via RESTful APIs. It handles user interactions, state management (Context API), and data visualization with Recharts.
2.  **Backend (Server)**: A Node.js REST API using Express.js. It handles business logic, authentication, request validation, and database interactions.
3.  **Database**: MongoDB (Atlas) for storing user data, expenses, and settings. It uses Mongoose as the ODM (Object Data Modeling) library.

### Key Directories

```
track_expenses/
├── finance-backend/        # Server-side code
│   ├── controllers/        # Request handlers (logic)
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/             # Database schemas
│   ├── routes/             # API route definitions
│   └── server.js           # App entry point
│
├── finance-frontend/       # Client-side code
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── context/        # Global state (Auth, Theme)
│   │   ├── layouts/        # Page wrappers
│   │   ├── pages/          # Main application views
│   │   └── services/       # API client config
```

---

## 💻 Technology Stack

### Frontend

- **Core**: React 18, React Router v6
- **State Management**: React Context API
- **Styling**: CSS Modules / Clean CSS Variables (Dark Mode supported)
- **HTTP Client**: Axios
- **Visualization**: Recharts
- **Notifications**: React Toastify
- **Icons**: React Icons (Feather Icons)

### Backend

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, Express Rate Limit, BCrypt, CORS
- **Validation**: Express Validator

---

## 📘 Technology Decisions & Deep Dive

### Why MERN Stack?

- **JavaScript Everywhere**: Using a single language (JS) across the entire stack streamlines development and allows for code reuse.
- **JSON Native**: MongoDB stores data in a JSON-like format (BSON), which maps directly to JavaScript objects.
- **Scalability**: Node.js's non-blocking Event Loop is ideal for handling multiple concurrent requests efficiently.
- **React Component Model**: React's component-based architecture makes building and maintaining complex UIs manageable.

### Authentication Architecture

- **Stateless JWT**: We use JSON Web Tokens (JWT) for authentication. This is a stateless mechanism, facilitating horizontal scaling.
- **Token Flow**:
  1.  User logs in → Server verifies credentials → Server signs a JWT with a secret key.
  2.  Client stores token securely.
  3.  Client attaches token to `Authorization` header (`Bearer <token>`) for subsequent requests.
  4.  Middleware (`auth.js`) verifies the token signature on every protected route.

---

## 🛡️ Security Policies

### 1. Data Protection

- **Password Hashing**: We use `bcryptjs` with a salt round of 10.
- **Environment Variables**: Sensitive keys (DB URI, JWT Secret) are stored in `.env` files and never committed to git.

### 2. API Security

- **Rate Limiting**: Limits repeated requests from the same IP to prevent brute-force attacks.
- **Headers**: `helmet` sets secure HTTP headers to protect against common web vulnerabilities.
- **Sanitization**: All incoming data is sanitized using `express-mongo-sanitize` and `xss-clean`.

---

## 🔌 API Documentation

All API endpoints are prefixed with `/api`.

### 1. Authentication (`/auth`)

| Method | Endpoint             | Description                   | Auth Required? |
| :----- | :------------------- | :---------------------------- | :------------- |
| POST   | `/auth/register`     | Register a new user           | No             |
| POST   | `/auth/login`        | Authenticate user & get token | No             |
| POST   | `/auth/logout`       | Logout user                   | Yes            |
| GET    | `/auth/me`           | Get current user profile      | Yes            |
| POST   | `/auth/forgot-pass`  | Request password reset link   | No             |
| POST   | `/auth/reset-pass`   | Reset password with token     | No             |

### 2. Expenses (`/expenses`)

| Method | Endpoint            | Description                   | Auth Required? |
| :----- | :------------------ | :---------------------------- | :------------- |
| GET    | `/expenses`         | Get all expenses (filterable) | Yes            |
| POST   | `/expenses`         | Create a new expense          | Yes            |
| GET    | `/expenses/:id`     | Get a specific expense        | Yes            |
| PUT    | `/expenses/:id`     | Update an expense             | Yes            |
| DELETE | `/expenses/:id`     | Delete an expense             | Yes            |
| GET    | `/expenses/summary` | Get expense analytics         | Yes            |
| GET    | `/expenses/trends`  | Get monthly trends            | Yes            |
| GET    | `/expenses/recent`  | Get recent transactions       | Yes            |

### 3. Users (`/users`)

| Method | Endpoint          | Description         | Auth Required? |
| :----- | :---------------- | :------------------ | :------------- |
| PUT    | `/users/profile`  | Update user profile | Yes            |
| PUT    | `/users/password` | Change password     | Yes            |
| DELETE | `/users/account`  | Delete account      | Yes            |

---

## 🗄️ Database Schema

### User Model

- `name`: String (Required)
- `email`: String (Unique, Required)
- `password`: String (Hashed)
- `role`: String (user/admin)
- `settings`: Object (Theme, Currency)

### Expense Model

- `user`: ObjectId (Ref: User)
- `title`: String
- `amount`: Number
- `type`: String (income/expense)
- `category`: String (food, transport, etc.)
- `date`: Date
- `description`: String (Optional)

---

## ⚠️ Coding Standards

- **Commits**: Use semantic commit messages (e.g., `feat: add login`).
- **Variables**: `camelCase` for variables/functions and `PascalCase` for React components.
- **Async**: Use `async/await` handling with `try/catch` blocks.
*Variables**: Use `camelCase` for variables/functions and `PascalCase` for React components.
- **Async**: Use `async/await` handling with `try/catch` blocks.
