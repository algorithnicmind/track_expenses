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
track_expenses/
├── docs/                          # Documentation
│   ├── DEPLOYMENT.md
│   ├── DEVELOPER_GUIDE.md
│   ├── TASK_TRACKER.md
│   └── USER_GUIDE.md
│
├── finance-backend/               # Node.js/Express Backend
│   ├── controllers/               # Route handlers
│   ├── middleware/                # Custom middleware
│   ├── models/                    # Mongoose models
│   ├── routes/                    # API routes
│   └── server.js                  # Entry point
│
├── finance-frontend/              # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── context/               # React Context
│   │   ├── layouts/               # Page layouts
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API services
│   │   ├── styles/                # Global styles
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
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
   cd finance-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables in `.env`:

   ```env
   PORT=5000
   NODE_ENV=production
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd finance-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

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

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Axios, Recharts, React Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt
- **Security**: Helmet, express-rate-limit, express-validator

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

---

Made with ❤️ by [Ankit]
ign system with:

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
