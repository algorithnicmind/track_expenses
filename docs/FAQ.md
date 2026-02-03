# ❓ Frequently Asked Questions

## Personal Finance Manager - FAQ

---

## 📋 General Questions

### What is Personal Finance Manager?

A MERN stack web application for tracking, managing, and analyzing personal and shared expenses in real-time.

### Who is this for?

- Individuals tracking personal expenses
- Families managing household budgets
- Teams/roommates splitting expenses
- Freelancers tracking business costs

### Is it free?

Yes, the core features are completely free to use.

---

## 🔧 Technical Questions

### What are the system requirements?

- Node.js v14+
- MongoDB v4.4+
- Modern web browser

### How do I install it locally?

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

### What technologies are used?

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT

---

## 🔐 Security Questions

### Is my data secure?

Yes! We use:

- JWT authentication
- Password hashing (bcrypt)
- HTTPS encryption
- Protected API endpoints

### How are passwords stored?

Passwords are hashed with bcrypt (12 salt rounds). We never store plain text passwords.

### Can I delete my account?

Yes, contact the administrator or use the account deletion feature.

---

## 💰 Usage Questions

### How do I add an expense?

1. Click "Add Expense"
2. Fill in details (title, amount, category)
3. Click "Save"

### Can I edit/delete expenses?

Yes, click the edit or delete icons next to any expense.

### What categories are available?

- Food & Dining
- Transportation
- Utilities
- Entertainment
- Shopping
- Health
- Education
- Other

### Can I export my data?

Yes, export to CSV or PDF from the Reports section.

---

## 🚨 Troubleshooting

### Login not working?

- Check email/password
- Clear browser cache
- Try password reset

### Expenses not saving?

- Check internet connection
- Ensure all required fields are filled
- Check browser console for errors

### Forgot password?

Use the "Forgot Password" link on login page.

### Page not loading?

- Check if servers are running
- Clear browser cache
- Check browser console

---

## 📞 Support

### How do I report a bug?

Open an issue on GitHub with:

- Bug description
- Steps to reproduce
- Expected vs actual behavior

### How do I request a feature?

Open a GitHub issue with the "Feature Request" label.

### How do I contact support?

- GitHub Issues
- Email: [your-email]

---

## 🔄 Updates

### How do I update the application?

```bash
git pull origin main
npm install  # in both backend and frontend
```

### How often are updates released?

Updates are released as needed, typically monthly.

---

_Last updated: February 2024_
