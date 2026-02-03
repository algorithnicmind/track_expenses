# 🤝 Contributing Guide

## Personal Finance Manager - How to Contribute

---

## 🎉 Welcome Contributors!

Thank you for considering contributing to the Personal Finance Manager! This document provides guidelines for contributing to this project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Submitting Changes](#submitting-changes)

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on collaboration
- Help maintain a welcoming community

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Git

### Fork & Clone

```bash
# Fork the repository on GitHub first

# Clone your fork
git clone https://github.com/YOUR-USERNAME/project4.git

# Add upstream remote
cd project4
git remote add upstream https://github.com/ORIGINAL-OWNER/project4.git
```

### Setup Development Environment

```bash
# Install backend dependencies
cd p4-finance-backend
npm install

# Install frontend dependencies
cd ../p4-finance-frontend
npm install
```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# OR
git checkout -b bugfix/issue-description
```

### 2. Make Changes

- Write clean, documented code
- Follow existing patterns
- Test your changes

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add expense filtering feature"
```

**Commit Message Format:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests

### 4. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📐 Coding Standards

### JavaScript/React

- Use ES6+ features
- Functional components with hooks
- Meaningful variable names
- Add comments for complex logic

### File Structure

```
components/
  ComponentName/
    index.js        # Component logic
    styles.css      # Component styles
```

### API Development

- RESTful conventions
- Proper error handling
- Input validation
- JWT authentication on protected routes

---

## ✅ Pull Request Checklist

- [ ] Code follows project style
- [ ] Self-reviewed my code
- [ ] Added comments where needed
- [ ] Updated documentation
- [ ] No new warnings/errors
- [ ] Tests pass (if applicable)

---

## 🙏 Thank You!

Every contribution helps make this project better!
