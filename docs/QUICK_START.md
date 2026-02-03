# ⚡ Quick Start Guide

## Personal Finance Manager - Get Started in 5 Minutes

---

## 🚀 Quick Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/project4.git
cd project4

# Install Backend
cd p4-finance-backend
npm install

# Install Frontend
cd ../p4-finance-frontend
npm install
```

### 2. Configure Environment

**Backend** (`p4-finance-backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance_manager
JWT_SECRET=your_secret_key_here
```

**Frontend** (`p4-finance-frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

### 3. Start MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

### 4. Run the Application

**Terminal 1 - Backend:**

```bash
cd p4-finance-backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd p4-finance-frontend
npm start
```

### 5. Access the App

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📱 First Steps

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Add Expense** - Click "+" to add your first expense
4. **View Dashboard** - See your expense summary

---

## 📖 Full Documentation

| Guide                 | Link                                           |
| --------------------- | ---------------------------------------------- |
| Complete Installation | [INSTALLATION.md](./INSTALLATION.md)           |
| User Guide            | [USER_GUIDE.md](./USER_GUIDE.md)               |
| API Reference         | [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) |
| All Features          | [FEATURES.md](./FEATURES.md)                   |

---

**Need help?** Check the [FAQ](./FAQ.md) or open a GitHub issue.
