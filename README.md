# Personal Finance Manager 💰

A modern, full-stack personal finance management application built with React and Node.js. Track your income and expenses, visualize spending patterns, and gain insights into your financial health.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## ✨ Features

### Core Features

- 📊 **Dashboard** - Overview of your finances with summary cards and charts
- 💸 **Expense Tracking** - Add, edit, and delete income/expense entries
- 📈 **Analytics** - Visual insights with interactive charts (Recharts)
- 🏷️ **Categories** - Organize transactions by customizable categories
- 🔍 **Search & Filter** - Find transactions quickly with advanced filters

### User Experience

- 🌓 **Dark Mode** - Beautiful light and dark themes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Smooth** - Optimized for performance
- 🔔 **Toast Notifications** - Real-time feedback on actions

### Security

- 🔐 **JWT Authentication** - Secure token-based auth
- 🛡️ **Password Hashing** - Bcrypt encryption
- 🚫 **Rate Limiting** - Protection against brute force
- ✅ **Input Validation** - Server-side data validation

## 🏗️ Project Structure

```
project4/
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURE_STATUS.md
│   ├── ROADMAP.md
│   └── TASK_TRACKER.md
│
├── p4-finance-backend/            # Node.js/Express Backend
│   ├── controllers/               # Route handlers
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   └── userController.js
│   ├── middleware/                # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validators.js
│   ├── models/                    # Mongoose models
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/                    # API routes
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── userRoutes.js
│   ├── server.js                  # Entry point
│   ├── package.json
│   └── .env.example
│
├── p4-finance-frontend/           # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   │   ├── ExpenseModal.js
│   │   │   └── ConfirmModal.js
│   │   ├── context/               # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── layouts/               # Page layouts
│   │   │   ├── AuthLayout.js
│   │   │   └── DashboardLayout.js
│   │   ├── pages/                 # Page components
│   │   │   ├── Landing.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Expenses.js
│   │   │   ├── Analytics.js
│   │   │   ├── Profile.js
│   │   │   ├── Settings.js
│   │   │   └── NotFound.js
│   │   ├── services/              # API services
│   │   │   └── api.js
│   │   ├── styles/                # Global styles
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd p4-finance-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file from example:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/p4-finance
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

5. Start the server:

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd p4-finance-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_NAME=Personal Finance Manager
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Documentation

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| GET    | `/api/auth/me`       | Get current user  |
| POST   | `/api/auth/logout`   | Logout user       |

### Expenses

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/api/expenses`         | Get all expenses (with filters) |
| POST   | `/api/expenses`         | Create expense                  |
| GET    | `/api/expenses/:id`     | Get single expense              |
| PUT    | `/api/expenses/:id`     | Update expense                  |
| DELETE | `/api/expenses/:id`     | Delete expense                  |
| GET    | `/api/expenses/summary` | Get expense summary             |
| GET    | `/api/expenses/trends`  | Get monthly trends              |
| GET    | `/api/expenses/recent`  | Get recent transactions         |

### Users

| Method | Endpoint                     | Description      |
| ------ | ---------------------------- | ---------------- |
| GET    | `/api/users/profile`         | Get user profile |
| PUT    | `/api/users/profile`         | Update profile   |
| PUT    | `/api/users/change-password` | Change password  |
| DELETE | `/api/users/account`         | Delete account   |

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI Library
- **React Router v6** - Routing
- **Axios** - HTTP Client
- **Recharts** - Charts & Graphs
- **React Toastify** - Notifications
- **React Icons** - Icon Library

### Backend

- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password Hashing

### Security

- **Helmet** - Security Headers
- **express-rate-limit** - Rate Limiting
- **express-validator** - Input Validation
- **express-mongo-sanitize** - NoSQL Injection Protection

## 🎨 Design System

The app uses a custom CSS design system with:

- CSS Custom Properties (variables)
- Dark mode support
- Responsive breakpoints
- Modular component styles
- Premium glassmorphism effects
- Smooth animations

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by [Ankit]
