# 🚀 Installation Guide

## Personal Finance Manager - Setup & Installation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

| Requirement | Minimum Version   | Download Link                                                 |
| ----------- | ----------------- | ------------------------------------------------------------- |
| **Node.js** | v14.0.0 or higher | [nodejs.org](https://nodejs.org/)                             |
| **npm**     | v6.0.0 or higher  | Comes with Node.js                                            |
| **MongoDB** | v4.4 or higher    | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git**     | v2.0 or higher    | [git-scm.com](https://git-scm.com/)                           |

### Verify Installation

Run these commands to verify your installations:

```bash
# Check Node.js version
node --version
# Expected: v14.0.0 or higher

# Check npm version
npm --version
# Expected: v6.0.0 or higher

# Check MongoDB version
mongod --version
# Expected: v4.4 or higher

# Check Git version
git --version
# Expected: v2.0 or higher
```

---

## 📥 Installation Steps

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/project4.git

# OR using SSH
git clone git@github.com:yourusername/project4.git

# Navigate to the project directory
cd project4
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd p4-finance-backend

# Install dependencies
npm install

# This will install:
# - express (v4.21.2)      - Web framework
# - mongoose (v8.11.0)     - MongoDB ODM
# - bcryptjs (v3.0.2)      - Password hashing
# - jsonwebtoken (v9.0.2)  - JWT authentication
# - cors (v2.8.5)          - Cross-origin requests
# - dotenv (v16.4.7)       - Environment variables
# - morgan (v1.10.0)       - HTTP logging
# - body-parser (v1.20.3)  - Request body parsing
```

### Step 3: Backend Environment Configuration

Create a `.env` file in the `p4-finance-backend` directory:

```bash
# Create .env file
touch .env
```

Add the following environment variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/finance_manager

# For MongoDB Atlas (cloud):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/finance_manager?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
JWT_EXPIRE=30d

# Optional: JWT Cookie Expire (in days)
JWT_COOKIE_EXPIRE=30
```

> ⚠️ **Security Note**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### Step 4: Frontend Setup

```bash
# Navigate back to project root, then to frontend
cd ../p4-finance-frontend

# Install dependencies
npm install

# This will install:
# - react (v19.0.0)           - UI library
# - react-dom (v19.0.0)       - React DOM rendering
# - react-router-dom (v7.2.0) - Routing
# - axios (v1.8.1)            - HTTP client
# - react-scripts (v5.0.1)    - Create React App scripts
# - Testing libraries
```

### Step 5: Frontend Environment Configuration

Create a `.env` file in the `p4-finance-frontend` directory:

```bash
# Create .env file
touch .env
```

Add the following:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/v1
```

---

## 🏃 Running the Application

### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Start Backend:**

```bash
cd p4-finance-backend
npm run dev   # Uses nodemon for hot-reloading
# OR
npm start     # Production mode
```

**Terminal 2 - Start Frontend:**

```bash
cd p4-finance-frontend
npm start
```

### Option 2: Using Concurrent (Advanced)

Install `concurrently` in the root directory for running both servers:

```bash
# In project root
npm init -y
npm install concurrently

# Add to package.json scripts:
{
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd p4-finance-backend && npm run dev",
    "client": "cd p4-finance-frontend && npm start"
  }
}

# Then simply run:
npm start
```

---

## ✅ Verify Installation

### Backend Verification

1. Open your browser or use curl:

   ```bash
   curl http://localhost:5000
   ```

2. You should see a response indicating the server is running.

### Frontend Verification

1. Open your browser to: `http://localhost:3000`
2. You should see the Personal Finance Manager login page.

### Database Verification

1. Connect to MongoDB:

   ```bash
   mongosh
   # OR for older MongoDB:
   mongo
   ```

2. Check the database:
   ```javascript
   use finance_manager
   show collections
   ```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue 1: MongoDB Connection Error

```
MongoNetworkError: failed to connect to server
```

**Solution:**

```bash
# Ensure MongoDB is running
# On Windows:
net start MongoDB

# On macOS/Linux:
sudo systemctl start mongod
# OR
mongod --dbpath /path/to/data/db
```

#### Issue 2: Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

```bash
# Find process using the port
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

#### Issue 3: Node Module Errors

```
Cannot find module 'xxx'
```

**Solution:**

```bash
# Remove node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

#### Issue 4: CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
Ensure your backend has CORS configured:

```javascript
// In server.js
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
```

#### Issue 5: JWT Token Errors

```
JsonWebTokenError: invalid token
```

**Solution:**

- Clear browser localStorage
- Check JWT_SECRET matches in .env
- Ensure token hasn't expired

---

## 🔄 Updating the Application

```bash
# Pull latest changes
git pull origin main

# Update backend dependencies
cd p4-finance-backend
npm install

# Update frontend dependencies
cd ../p4-finance-frontend
npm install
```

---

## 🗑️ Uninstallation

```bash
# Remove the project directory
cd ..
rm -rf project4

# Optional: Drop the database
mongosh
use finance_manager
db.dropDatabase()
```

---

## 📞 Need Help?

If you encounter any issues not covered here:

1. Check the [FAQ](./FAQ.md) document
2. Open an issue on GitHub
3. Contact the developer

---

<div align="center">

**Happy Coding! 🎉**

</div>
