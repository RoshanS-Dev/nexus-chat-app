# 📂 File Locations Guide

Quick reference for where to find and edit important files.

## 🔧 Configuration Files

### Backend Environment Variables
**Location:** `chat-app/backend/.env`

**What to edit:**
\`\`\`env
EMAIL_USER=youremail@gmail.com        ← Your Gmail address
EMAIL_PASS=abcdefghijklmnop           ← Your Gmail App Password (16 chars)
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OTP_EXPIRE_MINUTES=5
\`\`\`

**How to create:**
\`\`\`bash
cd chat-app/backend
cp .env.example .env
# Then edit .env with your values
\`\`\`

### Frontend Environment Variables
**Location:** `chat-app/frontend/.env`

**What to edit:**
\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
\`\`\`

**How to create:**
\`\`\`bash
cd chat-app/frontend
cp .env.example .env
\`\`\`

## 📧 Email Configuration Files

### Email Sending Utility
**Location:** `chat-app/backend/utils/sendEmail.js`

**What it does:**
- Sends OTP emails using Gmail SMTP
- Handles errors and logging
- Verifies email configuration

**When to edit:**
- To use different email provider
- To customize SMTP settings
- To modify error messages

### Authentication Controller
**Location:** `chat-app/backend/controllers/authController.js`

**What it does:**
- Handles registration with OTP
- Handles forgot password with OTP
- Handles OTP verification
- Handles resend OTP

**When to edit:**
- To customize email templates
- To change OTP logic
- To modify validation rules

### User Model
**Location:** `chat-app/backend/models/User.js`

**What it does:**
- Defines user schema
- Generates OTP
- Verifies OTP
- Clears OTP after verification

**When to edit:**
- To change OTP length (currently 6 digits)
- To modify expiry time logic
- To add new user fields

## 🎨 Frontend Pages

### OTP Verification Page
**Location:** `chat-app/frontend/src/pages/OTPVerificationPage.jsx`

**What it does:**
- Shows OTP input form
- Displays countdown timer
- Handles OTP verification
- Handles resend OTP

**When to edit:**
- To customize UI design
- To change timer duration
- To modify error messages

### Registration Page
**Location:** `chat-app/frontend/src/pages/RegisterPage.jsx`

**What it does:**
- User registration form
- Password validation
- Redirects to OTP verification

**When to edit:**
- To add/remove form fields
- To customize validation
- To change UI design

### Login Page
**Location:** `chat-app/frontend/src/pages/LoginPage.jsx`

**What it does:**
- User login form
- Supports email or mobile login
- Password visibility toggle

### Forgot Password Page
**Location:** `chat-app/frontend/src/pages/ForgotPasswordPage.jsx`

**What it does:**
- Request password reset
- Sends OTP to email
- Redirects to reset page

### Reset Password Page
**Location:** `chat-app/frontend/src/pages/ResetPasswordPage.jsx`

**What it does:**
- Enter OTP and new password
- Validates password
- Resets password

## 🧪 Testing Files

### Email Test Script
**Location:** `chat-app/backend/testEmail.js`

**What it does:**
- Tests email configuration
- Sends test email to yourself
- Verifies SMTP connection

**How to run:**
\`\`\`bash
cd chat-app/backend
npm run test:email
\`\`\`

## 📚 Documentation Files

### Main Documentation
**Location:** `chat-app/README.md`
- Complete project overview
- Installation instructions
- API documentation
- Deployment guide

### OTP Setup Guide
**Location:** `chat-app/OTP_SETUP_GUIDE.md`
- Step-by-step email setup
- Gmail App Password guide
- Testing procedures
- Troubleshooting

### Quick Start Guide
**Location:** `chat-app/QUICK_START.md`
- 5-minute setup
- Minimum configuration
- Quick testing

### Troubleshooting Guide
**Location:** `chat-app/TROUBLESHOOTING.md`
- Common issues
- Solutions
- Debug tips

### Fixes Summary
**Location:** `chat-app/OTP_FIXES_SUMMARY.md`
- Technical details
- Before/after comparisons
- Code changes

### Implementation Complete
**Location:** `chat-app/IMPLEMENTATION_COMPLETE.md`
- Project status
- Verification steps
- Success criteria

## 🗂️ Complete Project Structure

\`\`\`
chat-app/
│
├── 📚 Documentation
│   ├── README.md                    ← Start here
│   ├── QUICK_START.md              ← 5-minute setup
│   ├── OTP_SETUP_GUIDE.md          ← Email setup
│   ├── TROUBLESHOOTING.md          ← Common issues
│   ├── OTP_FIXES_SUMMARY.md        ← Technical details
│   ├── IMPLEMENTATION_COMPLETE.md  ← Project status
│   └── FILE_LOCATIONS.md           ← This file
│
├── 🔧 Backend
│   ├── .env                        ← ⚠️ EDIT THIS (email config)
│   ├── .env.example                ← Template
│   ├── package.json                ← Dependencies
│   ├── server.js                   ← Entry point
│   ├── testEmail.js                ← 🧪 Test email
│   │
│   ├── config/
│   │   ├── cloudinary.js           ← Cloudinary setup
│   │   └── database.js             ← MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js       ← 📧 OTP logic here
│   │   ├── userController.js
│   │   ├── messageController.js
│   │   ├── groupController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js                 ← 🔐 OTP methods here
│   │   ├── Message.js
│   │   └── Group.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── groupRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── socket/
│   │   └── socketHandler.js
│   │
│   └── utils/
│       ├── sendEmail.js            ← 📧 Email sending here
│       ├── generateToken.js
│       └── validators.js
│
└── 🎨 Frontend
    ├── .env                        ← ⚠️ EDIT THIS (API URLs)
    ├── .env.example                ← Template
    ├── package.json                ← Dependencies
    ├── vite.config.js              ← Vite config
    ├── tailwind.config.js          ← Tailwind config
    │
    └── src/
        ├── main.jsx                ← Entry point
        ├── App.jsx                 ← Main app
        ├── index.css               ← Global styles
        │
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── OTPVerificationPage.jsx  ← ⏱️ Timer here
        │   ├── ForgotPasswordPage.jsx
        │   ├── ResetPasswordPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── ChatPage.jsx
        │   ├── ProfilePage.jsx
        │   └── AdminDashboard.jsx
        │
        ├── redux/
        │   ├── store.js
        │   └── slices/
        │       ├── authSlice.js
        │       ├── chatSlice.js
        │       └── themeSlice.js
        │
        └── services/
            ├── api.js
            ├── authService.js      ← API calls
            ├── userService.js
            ├── messageService.js
            ├── groupService.js
            └── socket.js
\`\`\`

## 🎯 Quick Access

### To Edit Email Configuration:
1. Open: `chat-app/backend/.env`
2. Edit: `EMAIL_USER` and `EMAIL_PASS`
3. Save and restart backend

### To Test Email:
\`\`\`bash
cd chat-app/backend
npm run test:email
\`\`\`

### To Customize Email Templates:
1. Open: `chat-app/backend/controllers/authController.js`
2. Find: `sendEmail` function calls
3. Edit: HTML in the \`html\` parameter
4. Save and restart backend

### To Change OTP Expiry:
1. Open: `chat-app/backend/.env`
2. Edit: `OTP_EXPIRE_MINUTES=5` (change 5 to desired minutes)
3. Save and restart backend

### To Customize OTP Page UI:
1. Open: `chat-app/frontend/src/pages/OTPVerificationPage.jsx`
2. Edit: JSX and styling
3. Save (hot reload will update)

### To Change Countdown Timer:
1. Open: `chat-app/frontend/src/pages/OTPVerificationPage.jsx`
2. Find: `const [countdown, setCountdown] = useState(300);`
3. Change: 300 to desired seconds (300 = 5 minutes)
4. Save

## 🔍 Finding Specific Code

### OTP Generation:
**File:** `chat-app/backend/models/User.js`
**Method:** `generateOTP()`
**Line:** Search for "generateOTP"

### OTP Verification:
**File:** `chat-app/backend/models/User.js`
**Method:** `verifyOTP()`
**Line:** Search for "verifyOTP"

### Email Sending:
**File:** `chat-app/backend/utils/sendEmail.js`
**Function:** `sendEmail()`
**Line:** Entire file

### Registration with OTP:
**File:** `chat-app/backend/controllers/authController.js`
**Function:** `register()`
**Line:** Search for "export const register"

### Forgot Password:
**File:** `chat-app/backend/controllers/authController.js`
**Function:** `forgotPassword()`
**Line:** Search for "export const forgotPassword"

### Resend OTP:
**File:** `chat-app/backend/controllers/authController.js`
**Function:** `resendOTP()`
**Line:** Search for "export const resendOTP"

## 📝 Common Edits

### Change OTP Length (from 6 to 8 digits):
**File:** `chat-app/backend/models/User.js`
\`\`\`javascript
// Find this line:
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// Change to:
const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
\`\`\`

### Change Email Subject:
**File:** `chat-app/backend/controllers/authController.js`
\`\`\`javascript
// Find:
subject: 'Email Verification - Chat App',

// Change to:
subject: 'Your Custom Subject',
\`\`\`

### Change App Name in Emails:
**File:** `chat-app/backend/controllers/authController.js`
\`\`\`javascript
// Find all instances of "Chat App" in HTML templates
// Replace with your app name
\`\`\`

### Add More Form Fields:
**File:** `chat-app/frontend/src/pages/RegisterPage.jsx`
1. Add input field in JSX
2. Add to formData state
3. Update handleChange
4. Update backend User model
5. Update authController

## 🚀 Deployment Files

### Backend (Render):
- **Entry point:** `server.js`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** Copy from `.env`

### Frontend (Vercel):
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** Copy from `.env`

### Database (MongoDB Atlas):
- **Connection string:** Update `MONGODB_URI` in backend `.env`

## ✅ Checklist for Editing

Before editing any file:
- [ ] Backup the file
- [ ] Understand what it does
- [ ] Test after changes
- [ ] Check console for errors
- [ ] Restart server if backend
- [ ] Clear cache if frontend

## 🆘 Need Help?

**Can't find a file?**
- Use search in your code editor (Ctrl+P or Cmd+P)
- Check this guide again
- Files are exactly where shown in structure

**Don't know what to edit?**
- Check TROUBLESHOOTING.md
- Check OTP_SETUP_GUIDE.md
- Read code comments

**Made a mistake?**
- Restore from backup
- Or re-clone repository
- Follow QUICK_START.md again

---

**Last Updated:** 2024
**Version:** 1.0.0
