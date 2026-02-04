# 🛠️ P4 Finance - Developer Guide

Welcome to the technical documentation for the Personal Finance Manager (P4 Finance). This guide provides an in-depth look at the system architecture, technology stack, and API design to help you understand and contribute to the project.

---

## 🏗️ System Architecture

P4 Finance is built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) following a Client-Server architecture.

### High-Level Overview

```
[Client / Frontend]      [Server / Backend]       [Database]
   React.js 18  <------>  Node.js / Express  <--->  MongoDB
   (Vercel)               (Render)                  (Atlas)
```

1.  **Frontend (Client)**: A React Single Page Application (SPA) that interacts with the backend via RESTful APIs. It handles user interactions, state management (Context API), and data visualization.
2.  **Backend (Server)**: A Node.js REST API using Express.js. It handles business logic, authentication, request validation, and database interactions.
3.  **Database**: MongoDB (Atlas) for storing user data, expenses, and settings. It uses Mongoose as the ODM (Object Data Modeling) library.

### Key Directories

```
project4/
├── p4-finance-backend/     # Server-side code
│   ├── controllers/        # Request handlers (logic)
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/             # Database schemas
│   ├── routes/             # API route definitions
│   └── server.js           # App entry point
│
├── p4-finance-frontend/    # Client-side code
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
- **Validation**: Express Validator (Planned)

---

## � Technology Decisions & Deep Dive

### Why MERN Stack?

- **JavaScript Everywhere**: Using a single language (JS) across the entire stack streamlines development and allows for code reuse (e.g., validation logic).
- **JSON Native**: MongoDB stores data in a JSON-like format (BSON), which maps directly to JavaScript objects in the backend and frontend, eliminating the need for complex ORM mapping.
- **Scalability**: Node.js's non-blocking Event Loop is ideal for I/O-heavy applications like this one, handling multiple concurrent requests efficiently.
- **React Component Model**: React's component-based architecture makes building and maintaining complex UIs manageable and testable.

### Authentication Architecture

- **Stateless JWT**: We use JSON Web Tokens (JWT) for authentication. This is a stateless mechanism, meaning the server doesn't need to store session data in memory or a database (like Redis) for every request, making horizontal scaling easier.
- **Token Flow**:
  1.  User logs in → Server verifies credentials → Server signs a JWT with a secret key → Server sends token to client.
  2.  Client stores token (localStorage for MVP, HTTPOnly Cookie for Prod).
  3.  Client attaches token to `Authorization` header (`Bearer <token>`) for subsequent requests.
  4.  Middleware (`auth.js`) verifies the token signature on every protected route.

### State Management Strategy

- **Context API**: For an app of this size, Redux is often overkill. We use React's built-in **Context API** (`AuthContext`, `ThemeContext`) to manage global state like user sessions and theme preferences. This reduces boilerplates and dependency overhead.

---

## 🛡️ Security Policies

### 1. Data Protection

- **Password Hashing**: NEVER store plain-text passwords. We use `bcryptjs` with a salt round of 10.
- **Environment Variables**: Sensitive keys (DB URI, JWT Secret) MUST be stored in `.env` files and never committed to git.

### 2. API Security

- **Rate Limiting**: To prevent brute-force attacks, we limit repeated requests from the same IP (e.g., 10 login attempts per hour).
- **Headers**: We use `helmet` to set secure HTTP headers (e.g., HSTS, X-Frame-Options) to protect against common web vulnerabilities like clickjacking.
- **Sanitization**: All incoming data is sanitized (using `express-mongo-sanitize` and `xss-clean`) to prevent NoSQL injection and XSS attacks.

---

## �🔌 API Documentation

All API endpoints are prefixed with `/api`.
_Base URL (Dev):_ `http://localhost:5000/api`

### 1. Authentication (`/auth`)

| Method | Endpoint         | Description                   | Auth Required? |
| :----- | :--------------- | :---------------------------- | :------------- |
| POST   | `/auth/register` | Register a new user           | No             |
| POST   | `/auth/login`    | Authenticate user & get token | No             |
| POST   | `/auth/logout`   | Logout user                   | Yes            |
| GET    | `/auth/me`       | Get current user profile      | Yes            |

### 2. Expenses (`/expenses`)

| Method | Endpoint            | Description                   | Auth Required? |
| :----- | :------------------ | :---------------------------- | :------------- |
| GET    | `/expenses`         | Get all expenses (filterable) | Yes            |
| POST   | `/expenses`         | Create a new expense          | Yes            |
| GET    | `/expenses/:id`     | Get a specific expense        | Yes            |
| PUT    | `/expenses/:id`     | Update an expense             | Yes            |
| DELETE | `/expenses/:id`     | Delete an expense             | Yes            |
| GET    | `/expenses/summary` | Get expense analytics         | Yes            |
| GET    | `/expenses/recent`  | Get recent transactions       | Yes            |

### 3. Users (`/users`)

| Method | Endpoint          | Description         | Auth Required? |
| :----- | :---------------- | :------------------ | :------------- |
| PUT    | `/users/profile`  | Update user profile | Yes            |
| PUT    | `/users/password` | Change password     | Yes            |

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

- **Commits**: Use semantic commit messages (e.g., `feat: add login`, `fix: header alignment`).
- **Variables**: Use `camelCase` for variables/functions and `PascalCase` for React components.
- **Async**: Use `async/await` handling with `try/catch` blocks.
