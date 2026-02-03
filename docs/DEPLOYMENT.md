# 🌐 Deployment Guide

## Personal Finance Manager - Deployment Instructions

---

## 📊 Deployment Overview

| Component | Recommended Platform | Alternative           |
| --------- | -------------------- | --------------------- |
| Frontend  | Vercel               | Netlify, GitHub Pages |
| Backend   | Render               | Railway, Heroku       |
| Database  | MongoDB Atlas        | Self-hosted MongoDB   |

---

## 1️⃣ Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier)

### Configure Database

1. Create a database user (Database Access)
2. Add IP whitelist: `0.0.0.0/0` (Network Access)
3. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/finance_manager
   ```

---

## 2️⃣ Backend Deployment (Render)

### Prepare Backend

1. Ensure `package.json` has start script:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Deploy on Render

1. Go to [render.com](https://render.com/) and sign up
2. Click **"New Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your secret key
   - `NODE_ENV` - `production`
6. Click **"Create Web Service"**

Your backend URL: `https://your-app.onrender.com`

---

## 3️⃣ Frontend Deployment (Vercel)

### Prepare Frontend

1. Update API URL in `.env`:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api/v1
   ```

### Deploy on Vercel

1. Go to [vercel.com](https://vercel.com/) and sign up
2. Click **"Import Project"**
3. Select your repository
4. Configure:
   - **Root Directory**: `p4-finance-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL` - Your backend URL
6. Click **"Deploy"**

Your frontend URL: `https://your-app.vercel.app`

---

## 4️⃣ Environment Variables Summary

### Backend (.env)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

### Frontend (.env)

```env
REACT_APP_API_URL=https://your-backend.onrender.com/api/v1
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend API responds correctly
- [ ] Frontend loads without errors
- [ ] Database connection works
- [ ] Authentication works
- [ ] CORS configured correctly
- [ ] HTTPS enabled

---

## 🔒 Security Checklist

- [ ] Use HTTPS only
- [ ] Strong JWT secret (32+ characters)
- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] Input validation active

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

- Push to main branch → Auto deploy

---

## 🆘 Troubleshooting

| Issue               | Solution                               |
| ------------------- | -------------------------------------- |
| CORS errors         | Update CORS config with frontend URL   |
| Database connection | Check MongoDB URI and IP whitelist     |
| Build failures      | Check build logs, verify dependencies  |
| 502 errors          | Check backend logs on Render dashboard |
