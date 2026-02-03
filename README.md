# 💰 Personal Finance Manager

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![MERN](https://img.shields.io/badge/stack-MERN-blueviolet.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

**A comprehensive MERN-based web application for tracking, managing, and analyzing personal and shared expenses in real-time.**

[📖 Documentation](./docs/PROJECT_OVERVIEW.md) • [🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [📸 Screenshots](#-screenshots)

</div>

---

## 🌟 Overview

**Personal Finance Manager** is a modern, full-stack web application designed to help individuals and teams take control of their finances. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a secure, intuitive, and feature-rich platform for expense tracking and financial analysis.

### 🎯 Key Highlights

- 📊 **Real-Time Tracking** - Instantly sync and update financial records
- 🔐 **Secure Authentication** - JWT-based protection for your data
- 📁 **Document Management** - Store invoices, receipts, and financial documents
- 👥 **Collaboration Support** - Manage shared expenses with teams or families
- 📈 **Smart Analytics** - Visualize spending patterns with charts and graphs

---

## 📁 Project Structure

```
project4/
├── 📂 p4-finance-backend/     # Backend API (Node.js + Express)
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Authentication middleware
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   └── server.js              # Entry point
│
├── 📂 p4-finance-frontend/    # Frontend (React.js)
│   ├── public/                # Static assets
│   └── src/
│       ├── api/               # API service calls
│       ├── components/        # Reusable components
│       ├── pages/             # Page components
│       └── styles/            # CSS styles
│
└── 📂 docs/                   # Documentation
    ├── PROJECT_OVERVIEW.md
    ├── ARCHITECTURE.md
    ├── INSTALLATION.md
    ├── API_DOCUMENTATION.md
    ├── FEATURES.md
    ├── TECH_STACK.md
    ├── USER_GUIDE.md
    ├── CONTRIBUTING.md
    ├── DEPLOYMENT.md
    ├── CHANGELOG.md
    └── FAQ.md
```

---

## ✨ Features

| Feature                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| 💸 **Expense Tracking**    | Add, edit, delete, and categorize expenses  |
| 📊 **Real-Time Updates**   | Instant synchronization across all reports  |
| 🔒 **Secure Login**        | JWT-based authentication system             |
| 📁 **Document Storage**    | Upload and manage financial documents       |
| 👥 **Multi-User Support**  | Collaborative expense management            |
| 🌓 **Dark/Light Mode**     | Theme toggle for enhanced UX                |
| 💹 **Budget Tracking**     | Set budgets and receive overspending alerts |
| 📤 **Export Options**      | Download reports as CSV/PDF                 |
| 📈 **Analytics Dashboard** | Visual insights into spending patterns      |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/project4.git
   cd project4
   ```

2. **Setup Backend**

   ```bash
   cd p4-finance-backend
   npm install
   # Configure .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd p4-finance-frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

> 📖 For detailed installation instructions, see [INSTALLATION.md](./docs/INSTALLATION.md)

---

## 🛠️ Tech Stack

| Layer              | Technology                                             |
| ------------------ | ------------------------------------------------------ |
| **Frontend**       | React.js, Redux/Context API, React Router, Material UI |
| **Backend**        | Node.js, Express.js                                    |
| **Database**       | MongoDB with Mongoose ODM                              |
| **Authentication** | JWT (JSON Web Tokens)                                  |
| **Styling**        | CSS, Material UI/Bootstrap                             |

> 📖 For detailed tech stack information, see [TECH_STACK.md](./docs/TECH_STACK.md)

---

## 📸 Screenshots

<div align="center">

|                     Dashboard                     |               Expense Management                |
| :-----------------------------------------------: | :---------------------------------------------: |
| ![Dashboard](./docs/assets/dashboard-preview.png) | ![Expenses](./docs/assets/expenses-preview.png) |

|                    Reports                    |                    Settings                     |
| :-------------------------------------------: | :---------------------------------------------: |
| ![Reports](./docs/assets/reports-preview.png) | ![Settings](./docs/assets/settings-preview.png) |

</div>

---

## 📖 Documentation

Comprehensive documentation is available in the `/docs` directory:

| Document                                            | Description                             |
| --------------------------------------------------- | --------------------------------------- |
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)   | Complete project description and goals  |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md)           | System architecture and design patterns |
| [INSTALLATION.md](./docs/INSTALLATION.md)           | Detailed setup and installation guide   |
| [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) | Backend API endpoints reference         |
| [FEATURES.md](./docs/FEATURES.md)                   | Detailed feature descriptions           |
| [TECH_STACK.md](./docs/TECH_STACK.md)               | Technology stack details                |
| [USER_GUIDE.md](./docs/USER_GUIDE.md)               | How to use the application              |
| [CONTRIBUTING.md](./docs/CONTRIBUTING.md)           | Contribution guidelines                 |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md)               | Deployment instructions                 |
| [FAQ.md](./docs/FAQ.md)                             | Frequently asked questions              |

---

## 👤 Author

**Ankit**

- 🎓 EDY Internship Project Submission
- 📧 Contact: [Your Email]
- 🔗 GitHub: [Your GitHub Profile]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Ankit

</div>
