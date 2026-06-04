# ⚡ Quick Start Guide - Chat App

Get your chat application running in 5 minutes!

## 🚀 Prerequisites

- Node.js installed
- MongoDB running (or MongoDB Atlas account)
- Gmail account

## 📝 Step 1: Install Dependencies

\`\`\`bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
\`\`\`

## 🔧 Step 2: Configure Backend Environment

1. Copy the example environment file:
\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

2. Edit `.env` file with your credentials:

**Minimum Required Configuration:**
\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/chat-app

# JWT Secret (change this!)
JWT_SECRET=my_super_secret_key_12345

# Gmail Configuration (REQUIRED for OTP)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_16_char_app_password

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

## 📧 Step 3: Get Gmail App Password

**Quick Steps:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Paste in `.env` as `EMAIL_PASS` (remove spaces)

**Detailed guide:** See `OTP_SETUP_GUIDE.md`

## ☁️ Step 4: Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env` file

## 🧪 Step 5: Test Email Configuration

\`\`\`bash
cd backend
npm run test:email
\`\`\`

You should see:
\`\`\`
✅ EMAIL TEST SUCCESSFUL!
📬 Check your inbox: youremail@gmail.com
\`\`\`

If you see errors, check `OTP_SETUP_GUIDE.md`

## 🎯 Step 6: Configure Frontend

1. Copy the example environment file:
\`\`\`bash
cd frontend
cp .env.example .env
\`\`\`

2. Edit `.env` file:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
\`\`\`

## 🏃 Step 7: Run the Application

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

You should see:
\`\`\`
Server running on port 5000
MongoDB Connected: localhost
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

You should see:
\`\`\`
Local: http://localhost:3000
\`\`\`

## 🎉 Step 8: Test the Application

1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill in the registration form
4. Check your email for OTP
5. Enter OTP to verify
6. Start chatting!

## 🐛 Common Issues

### Issue: "Email sending failed"
**Solution:** 
- Check EMAIL_USER and EMAIL_PASS in .env
- Make sure you're using App Password, not regular password
- Run `npm run test:email` to diagnose

### Issue: "MongoDB connection failed"
**Solution:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string

### Issue: "Port already in use"
**Solution:**
- Change PORT in backend/.env
- Or kill the process using the port

### Issue: "Cannot find module"
**Solution:**
- Run `npm install` in both backend and frontend folders

## 📚 Next Steps

- Read `README.md` for full documentation
- Read `OTP_SETUP_GUIDE.md` for email setup details
- Customize the application
- Deploy to production

## 🆘 Need Help?

1. Check backend console for error messages
2. Check frontend console (F12 in browser)
3. Review `OTP_SETUP_GUIDE.md`
4. Review `README.md`

## ✅ Checklist

Before you start:
- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Gmail App Password generated
- [ ] Cloudinary account created
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Email test passed
- [ ] Backend server running
- [ ] Frontend server running

## 🎊 Success!

If everything is working:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ MongoDB connected
- ✅ Email sending works
- ✅ Registration with OTP works

**You're ready to chat! 🚀**

---

**Time to complete:** ~5 minutes
**Difficulty:** Easy


---

## 🎨 Modern UI Version (v2.0)

### New Features

The application now includes a completely redesigned modern UI:

#### Modern Pages
- **Modern Login** (`/login`) - Glassmorphism design with animated background
- **Modern Register** (`/register`) - Split-screen layout with feature showcase  
- **Modern Chat** (`/messages`) - 3-column responsive layout

#### Navigation
- **Chats Tab** - Recent conversations with search
- **Friends Tab** - All friends with online status
- **Requests Tab** - Pending and sent friend requests

#### Real-Time Features
- ✅ Socket.IO integration
- ✅ Online/offline status indicators
- ✅ Typing indicators
- ✅ Message delivery status (Sent/Delivered/Seen)
- ✅ Real-time friend request notifications

#### Design System
- Glassmorphism effects throughout
- Smooth Framer Motion animations
- Dark theme with purple/blue gradients
- Responsive design (Mobile/Tablet/Desktop)
- Modern badges and notifications

### User Flow

1. **Register** → Visit `/register` with modern split-screen design
2. **Verify OTP** → Check email and verify within 5 minutes
3. **Login** → Use `/login` with glassmorphism form
4. **Chat** → Redirected to `/messages` (main chat interface)

### Friend Request System

1. Click **"Requests"** tab in sidebar
2. Search for users by username or name
3. Click **"Add"** to send friend request
4. User receives real-time notification
5. Accept/reject requests in **"Received"** tab
6. View sent requests in **"Sent"** tab
7. Start chatting with friends

### Chat Interface

**3-Column Layout:**
- **Left:** Sidebar with navigation tabs
- **Center:** Chat list or conversation
- **Right:** User profile (desktop only)

**Mobile:** Hamburger menu with overlay sidebar

### Additional Documentation

- [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) - Complete feature list
- [MODERN_UI_IMPLEMENTATION.md](./MODERN_UI_IMPLEMENTATION.md) - Design system guide
- [MODERN_UI_UPGRADE_GUIDE.md](./MODERN_UI_UPGRADE_GUIDE.md) - Upgrade instructions

---

**Modern UI Version:** 2.0.0
**Last Updated:** 2026-05-29
