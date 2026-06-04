# ⚡ Quick Commands Reference

Fast reference for all available commands in the Chat App.

## 🚀 Server Commands

### Backend
\`\`\`bash
cd backend

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Install dependencies
npm install
\`\`\`

### Frontend
\`\`\`bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
\`\`\`

## 📧 Email Testing

\`\`\`bash
cd backend

# Test email configuration
npm run test:email
\`\`\`

**What it does:**
- Tests Gmail SMTP connection
- Sends test email to yourself
- Verifies email configuration
- Shows detailed error messages

## 🗄️ Database Management

### List Users
\`\`\`bash
cd backend

# List all registered users
npm run db:list
\`\`\`

**Shows:**
- User name, username, email
- Verification status
- Registration date
- Last seen time

### Delete User
\`\`\`bash
cd backend

# Delete specific user by email
npm run db:delete user@example.com
\`\`\`

**Deletes:**
- User account
- All user's messages
- User's group memberships
- Groups where user is admin

### Clear Database
\`\`\`bash
cd backend

# Delete ALL data (use with caution!)
npm run db:clear
\`\`\`

**Deletes:**
- All users
- All messages
- All groups

## 🧪 Testing Workflow

### Complete Test Cycle
\`\`\`bash
# 1. Clear database
cd backend
npm run db:clear

# 2. Test email
npm run test:email

# 3. Start backend
npm run dev

# 4. Start frontend (new terminal)
cd frontend
npm run dev

# 5. Test registration
# Go to http://localhost:3000/register

# 6. Check registered users
cd backend
npm run db:list

# 7. Delete test user
npm run db:delete test@example.com
\`\`\`

## 📦 Installation Commands

### Initial Setup
\`\`\`bash
# Clone repository
git clone <repository-url>
cd chat-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### Environment Setup
\`\`\`bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your credentials

# Frontend
cd frontend
cp .env.example .env
# Edit .env with API URLs
\`\`\`

## 🔧 MongoDB Commands

### Start MongoDB
\`\`\`bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
\`\`\`

### Connect to MongoDB
\`\`\`bash
# Local
mongo
# or
mongosh

# Atlas
mongosh "mongodb+srv://cluster.mongodb.net/chat-app" --username your_username
\`\`\`

### MongoDB Shell Commands
\`\`\`javascript
// Use database
use chat-app

// List all users
db.users.find().pretty()

// Count users
db.users.countDocuments()

// Find user by email
db.users.findOne({ email: "user@example.com" })

// Delete user
db.users.deleteOne({ email: "user@example.com" })

// Delete all users
db.users.deleteMany({})

// Find unverified users
db.users.find({ isVerified: false })

// Delete unverified users
db.users.deleteMany({ isVerified: false })
\`\`\`

## 🐛 Debugging Commands

### Check Logs
\`\`\`bash
# Backend logs (in terminal where backend is running)
# Look for:
# - 🔐 OTP Generated
# - 📧 Email sent successfully
# - ❌ Error messages

# Frontend logs (browser console F12)
# Look for:
# - API errors
# - Network errors
# - Console.log messages
\`\`\`

### Test API Endpoints
\`\`\`bash
# Health check
curl http://localhost:5000/api/health

# Or in browser
http://localhost:5000/api/health
\`\`\`

## 🔄 Git Commands

\`\`\`bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main

# Pull latest
git pull origin main

# Create branch
git checkout -b feature-name

# Switch branch
git checkout main
\`\`\`

## 📝 NPM Commands

### Package Management
\`\`\`bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# Remove package
npm uninstall package-name

# Clear cache
npm cache clean --force
\`\`\`

## 🚀 Deployment Commands

### Build for Production
\`\`\`bash
# Frontend
cd frontend
npm run build
# Creates 'dist' folder

# Backend (no build needed)
# Just ensure .env is configured
\`\`\`

### Deploy to Vercel (Frontend)
\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Deploy to production
vercel --prod
\`\`\`

### Deploy to Render (Backend)
\`\`\`bash
# Push to GitHub
git push origin main

# Then deploy via Render dashboard
# Or use Render CLI
\`\`\`

## 🔍 Search Commands

### Find in Files
\`\`\`bash
# Windows (PowerShell)
Select-String -Path "*.js" -Pattern "searchterm"

# Mac/Linux
grep -r "searchterm" .

# Or use your code editor's search (Ctrl+Shift+F)
\`\`\`

## 📊 Port Management

### Check Port Usage
\`\`\`bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -ti:5000
lsof -ti:3000
\`\`\`

### Kill Process on Port
\`\`\`bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
# or
lsof -ti:5000 | xargs kill -9
\`\`\`

## 🎯 Quick Troubleshooting

### Email Not Working
\`\`\`bash
# 1. Test email config
npm run test:email

# 2. Check .env file
cat .env | grep EMAIL

# 3. Verify Gmail App Password
# See OTP_SETUP_GUIDE.md
\`\`\`

### Database Connection Failed
\`\`\`bash
# 1. Check MongoDB is running
mongo --eval "db.version()"

# 2. Check connection string
cat .env | grep MONGODB_URI

# 3. Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community  # Mac
\`\`\`

### Port Already in Use
\`\`\`bash
# 1. Find process
netstat -ano | findstr :5000  # Windows
lsof -ti:5000  # Mac/Linux

# 2. Kill process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # Mac/Linux

# 3. Or change port in .env
PORT=5001
\`\`\`

## 📚 Documentation Commands

### View Documentation
\`\`\`bash
# Main documentation
cat README.md

# Quick start
cat QUICK_START.md

# OTP setup
cat OTP_SETUP_GUIDE.md

# Troubleshooting
cat TROUBLESHOOTING.md

# Database management
cat DATABASE_MANAGEMENT.md

# This file
cat COMMANDS_REFERENCE.md
\`\`\`

## 🎨 Code Formatting

### Prettier (if installed)
\`\`\`bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
\`\`\`

### ESLint (if installed)
\`\`\`bash
# Lint files
npx eslint .

# Fix auto-fixable issues
npx eslint . --fix
\`\`\`

## 🔐 Security Commands

### Generate JWT Secret
\`\`\`bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or online
# https://www.grc.com/passwords.htm
\`\`\`

### Check for Vulnerabilities
\`\`\`bash
# Check npm packages
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix
npm audit fix --force
\`\`\`

## 📦 Backup Commands

### Backup Database
\`\`\`bash
# Backup
mongodump --db chat-app --out ./backup

# Restore
mongorestore --db chat-app ./backup/chat-app
\`\`\`

### Backup Code
\`\`\`bash
# Create zip
tar -czf chat-app-backup.tar.gz chat-app/

# Or use Git
git push origin main
\`\`\`

## 🎯 One-Line Commands

\`\`\`bash
# Full reset and test
cd backend && npm run db:clear && npm run test:email && npm run dev

# Install and start
cd backend && npm install && npm run dev

# Build and deploy frontend
cd frontend && npm run build && vercel --prod

# List and delete user
cd backend && npm run db:list && npm run db:delete user@example.com
\`\`\`

## 📱 Mobile Testing

### Test on Mobile Device
\`\`\`bash
# 1. Find your local IP
# Windows
ipconfig

# Mac/Linux
ifconfig

# 2. Update frontend .env
VITE_API_URL=http://YOUR_IP:5000/api
VITE_SOCKET_URL=http://YOUR_IP:5000

# 3. Access from mobile
http://YOUR_IP:3000
\`\`\`

## 🆘 Emergency Commands

### Complete Reset
\`\`\`bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear database
cd backend
npm run db:clear

# 3. Clear node_modules
rm -rf node_modules
cd ../frontend
rm -rf node_modules

# 4. Reinstall
cd ../backend
npm install
cd ../frontend
npm install

# 5. Restart
cd ../backend
npm run dev
# New terminal
cd frontend
npm run dev
\`\`\`

---

**Quick Access:**
- 📧 Email Test: `npm run test:email`
- 📋 List Users: `npm run db:list`
- 🗑️ Delete User: `npm run db:delete email@example.com`
- 🧹 Clear DB: `npm run db:clear`
- 🚀 Start Dev: `npm run dev`

**Last Updated:** 2024
