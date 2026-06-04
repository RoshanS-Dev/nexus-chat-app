# 🚀 Real-Time Chat Application - MERN Stack

A complete production-level real-time chat application built with MERN Stack, Socket.IO, and modern web technologies.

## ✨ Features

- 🔐 **Complete Authentication System**
  - Secure registration with email verification
  - OTP-based email verification
  - Login with email or mobile number
  - Forgot password with OTP
  - JWT authentication
  - Password validation (min 8 chars, uppercase, special char, 2-3 digits)

- 💬 **Real-Time Messaging**
  - Instant private messaging
  - Group chat functionality
  - Typing indicators
  - Online/offline status
  - Message delivery & read receipts
  - File sharing (images, documents, PDFs)
  - Emoji picker & reactions
  - Message search
  - Pinned messages

- 👥 **User Management**
  - Unique username system
  - User search by username
  - Profile management
  - Avatar upload
  - Block/unblock users
  - Theme toggle (light/dark mode)

- 📊 **Admin Dashboard**
  - User statistics
  - Message analytics
  - Active users monitoring

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router DOM
- Tailwind CSS
- Socket.IO Client
- Axios
- React Hot Toast
- Emoji Picker React
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- Bcrypt.js
- Nodemailer (Email)
- Multer (File Upload)
- Cloudinary (Cloud Storage)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Gmail account with App Password enabled
- Cloudinary account (for file uploads)

## 🔧 Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd chat-app
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit the `.env` file with your credentials:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Choose one option:
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/chat-app

# Option 2: MongoDB Atlas (Recommended for production)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app

# JWT Secret (Change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration
# Sign up at https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Gmail SMTP)
# IMPORTANT: Use Gmail App Password, NOT your regular Gmail password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# OTP Configuration
OTP_EXPIRE_MINUTES=5
\`\`\`

### 4. Gmail App Password Setup (CRITICAL FOR OTP EMAILS)

**Follow these steps to get your Gmail App Password:**

1. **Enable 2-Step Verification:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Click on "Security" in the left sidebar
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the prompts to enable 2-Step Verification

2. **Generate App Password:**
   - After enabling 2-Step Verification, go back to Security
   - Under "Signing in to Google", click "App passwords"
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Chat App" as the name
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
   - Remove spaces and paste it in your `.env` file as `EMAIL_PASS`

3. **Update .env file:**
   \`\`\`env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   \`\`\`

**Important Notes:**
- ❌ DO NOT use your regular Gmail password
- ✅ DO use the 16-character App Password
- ✅ Remove all spaces from the App Password
- ✅ Keep this password secure and never commit it to Git

### 5. Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

### 6. Frontend Setup

\`\`\`bash
cd ../frontend
npm install
\`\`\`

Create a `.env` file in the `frontend` folder:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit the `.env` file:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
\`\`\`

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📧 Testing OTP Email Functionality

### 1. Registration Flow
1. Go to http://localhost:3000/register
2. Fill in all required fields
3. Click "Sign Up"
4. Check your email inbox (and spam folder) for the OTP
5. Enter the 6-digit OTP on the verification page
6. You'll be redirected to the dashboard

### 2. Forgot Password Flow
1. Go to http://localhost:3000/forgot-password
2. Enter your registered email
3. Check your email for the OTP
4. Enter OTP and new password
5. Login with your new password

### 3. Debugging Email Issues

If emails are not being received, check the backend console logs:

✅ **Successful email sending looks like:**
\`\`\`
📧 Attempting to send email to: user@example.com
📧 Using email account: youremail@gmail.com
🔍 Verifying email transporter...
✅ Email transporter verified successfully
📤 Sending email...
✅ Email sent successfully!
📬 Message ID: <message-id>
\`\`\`

❌ **Common errors and solutions:**

**Error: "Authentication failed"**
- Solution: Make sure you're using Gmail App Password, not regular password
- Verify 2-Step Verification is enabled

**Error: "Invalid login"**
- Solution: Check EMAIL_USER and EMAIL_PASS in .env file
- Make sure there are no extra spaces

**Error: "Connection timeout"**
- Solution: Check your internet connection
- Try using a different network

## 📁 Project Structure

\`\`\`
chat-app/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── groupController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Group.js
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── groupRoutes.js
│   │   ├── messageRoutes.js
│   │   └── userRoutes.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   └── validators.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ChatPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── OTPVerificationPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── ResetPasswordPage.jsx
    │   ├── redux/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js
    │   │   │   ├── chatSlice.js
    │   │   │   └── themeSlice.js
    │   │   └── store.js
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── groupService.js
    │   │   ├── messageService.js
    │   │   ├── socket.js
    │   │   └── userService.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .env.example
    ├── package.json
    └── vite.config.js
\`\`\`

## 🔐 Password Requirements

Passwords must contain:
- Minimum 8 characters
- At least 1 uppercase letter
- Lowercase letters
- At least 1 special character (@$!%*?&#)
- At least 2-3 digits

Example valid password: `Roshan@123`

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/verify-otp` - Verify email OTP
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- POST `/api/auth/forgot-password` - Send password reset OTP
- POST `/api/auth/reset-password` - Reset password with OTP
- POST `/api/auth/resend-otp` - Resend OTP

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- POST `/api/users/upload-avatar` - Upload avatar
- GET `/api/users/search` - Search users
- GET `/api/users/:username` - Get user by username
- POST `/api/users/block/:userId` - Block user
- POST `/api/users/unblock/:userId` - Unblock user

### Messages
- POST `/api/messages/send` - Send message
- GET `/api/messages/:userId` - Get messages with user
- GET `/api/messages/group/:groupId` - Get group messages
- GET `/api/messages/recent` - Get recent chats
- PUT `/api/messages/:messageId/delivered` - Mark as delivered
- PUT `/api/messages/:messageId/seen` - Mark as seen
- POST `/api/messages/:messageId/react` - Add reaction

### Groups
- POST `/api/groups` - Create group
- GET `/api/groups` - Get user groups
- GET `/api/groups/:groupId` - Get group by ID
- PUT `/api/groups/:groupId` - Update group
- POST `/api/groups/:groupId/members` - Add members
- DELETE `/api/groups/:groupId/members/:memberId` - Remove member

## 🚢 Deployment

### Backend (Render)
1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import your repository
3. Add environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in backend .env

## 🐛 Troubleshooting

### OTP Emails Not Received
1. Check backend console for error messages
2. Verify Gmail App Password is correct
3. Check spam/junk folder
4. Ensure 2-Step Verification is enabled
5. Try generating a new App Password

### Socket Connection Issues
1. Check CORS configuration
2. Verify FRONTEND_URL in backend .env
3. Check firewall settings

### Database Connection Issues
1. Verify MongoDB is running (if local)
2. Check MONGODB_URI format
3. Ensure IP whitelist in MongoDB Atlas

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using MERN Stack

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
