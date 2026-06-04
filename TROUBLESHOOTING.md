# 🔧 Troubleshooting Guide - Chat App

Common issues and their solutions.

## 📧 Email/OTP Issues

### Issue 1: "Email sending failed: Invalid login"

**Symptoms:**
- Backend console shows authentication error
- Users don't receive OTP emails
- Error: "535-5.7.8 Username and Password not accepted"

**Solutions:**
1. **Verify you're using App Password, not regular password**
   \`\`\`bash
   # Check your .env file
   EMAIL_PASS=abcdefghijklmnop  # Should be 16 characters, no spaces
   \`\`\`

2. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Generate new App Password

3. **Regenerate App Password**
   - Delete old App Password
   - Generate new one
   - Update .env file
   - Restart backend server

4. **Check for typos**
   \`\`\`bash
   # Verify EMAIL_USER
   EMAIL_USER=youremail@gmail.com  # Must be full email
   
   # Verify EMAIL_PASS
   EMAIL_PASS=abcdefghijklmnop  # No spaces, 16 characters
   \`\`\`

### Issue 2: "Email not received"

**Symptoms:**
- No error in backend
- Email sent successfully (according to logs)
- User doesn't receive email

**Solutions:**
1. **Check spam/junk folder**
   - Gmail may mark automated emails as spam
   - Mark as "Not Spam" to whitelist

2. **Wait a few minutes**
   - Sometimes there's a delay
   - Can take up to 5 minutes

3. **Check email address**
   - Verify correct email was entered
   - Check for typos

4. **Try different email**
   - Test with another Gmail account
   - Try different email provider

5. **Check Gmail quota**
   - Gmail has sending limits
   - Wait and try again later

### Issue 3: "OTP expired"

**Symptoms:**
- User enters OTP but gets "expired" error
- OTP was received but took too long to enter

**Solutions:**
1. **Click "Resend OTP"**
   - Wait for countdown timer
   - Request new OTP
   - Enter quickly

2. **Increase expiry time** (if needed)
   \`\`\`env
   # In backend/.env
   OTP_EXPIRE_MINUTES=10  # Increase from 5 to 10
   \`\`\`

3. **Check system time**
   - Ensure server time is correct
   - Sync system clock

### Issue 4: "Invalid OTP"

**Symptoms:**
- User enters correct OTP
- Gets "Invalid OTP" error

**Solutions:**
1. **Check for typos**
   - OTP is case-sensitive (though it's numbers only)
   - Ensure all 6 digits are entered

2. **Use latest OTP**
   - If you clicked "Resend", old OTP is invalid
   - Use the most recent OTP

3. **Check database**
   \`\`\`bash
   # Connect to MongoDB
   mongo
   use chat-app
   db.users.find({ email: "user@example.com" }).pretty()
   # Check otp and otpExpiry fields
   \`\`\`

### Issue 5: "Cannot resend OTP"

**Symptoms:**
- Resend button is disabled
- Countdown timer still running

**Solutions:**
1. **Wait for countdown**
   - Timer must reach 0:00
   - Prevents spam

2. **Refresh page** (if stuck)
   - Reload the page
   - Timer should reset

## 🗄️ Database Issues

### Issue 6: "MongoDB connection failed"

**Symptoms:**
- Backend won't start
- Error: "MongoServerError: connect ECONNREFUSED"

**Solutions:**
1. **Start MongoDB**
   \`\`\`bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   \`\`\`

2. **Check MongoDB is running**
   \`\`\`bash
   # Try connecting
   mongo
   # or
   mongosh
   \`\`\`

3. **Use MongoDB Atlas**
   \`\`\`env
   # In backend/.env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app
   \`\`\`

4. **Check connection string**
   - Verify MONGODB_URI format
   - Check username/password
   - Ensure IP is whitelisted (Atlas)

### Issue 7: "Duplicate key error"

**Symptoms:**
- Can't register user
- Error: "E11000 duplicate key error"

**Solutions:**
1. **Email already exists**
   - Use different email
   - Or login with existing account

2. **Username already taken**
   - Choose different username
   - Usernames must be unique

3. **Mobile number already registered**
   - Use different mobile number
   - Or login with existing account

4. **Clear test data**
   \`\`\`bash
   mongo
   use chat-app
   db.users.deleteMany({})  # Delete all users (careful!)
   \`\`\`

## 🔐 Authentication Issues

### Issue 8: "Token expired"

**Symptoms:**
- Logged out automatically
- Error: "jwt expired"

**Solutions:**
1. **Login again**
   - Token expires after 7 days (default)
   - Just login again

2. **Increase token expiry**
   \`\`\`env
   # In backend/.env
   JWT_EXPIRE=30d  # Increase to 30 days
   \`\`\`

### Issue 9: "Not authorized"

**Symptoms:**
- Can't access protected routes
- Error: "Not authorized, no token"

**Solutions:**
1. **Login again**
   - Token may be missing
   - Clear browser cache
   - Login fresh

2. **Check localStorage**
   \`\`\`javascript
   // In browser console
   localStorage.getItem('token')
   localStorage.getItem('user')
   \`\`\`

3. **Clear and re-login**
   \`\`\`javascript
   // In browser console
   localStorage.clear()
   // Then login again
   \`\`\`

## 🌐 Network Issues

### Issue 10: "CORS error"

**Symptoms:**
- Frontend can't connect to backend
- Error: "Access-Control-Allow-Origin"

**Solutions:**
1. **Check FRONTEND_URL**
   \`\`\`env
   # In backend/.env
   FRONTEND_URL=http://localhost:3000
   \`\`\`

2. **Restart backend**
   - Stop backend (Ctrl+C)
   - Start again: \`npm run dev\`

3. **Check ports**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

### Issue 11: "Socket connection failed"

**Symptoms:**
- Real-time features don't work
- No online/offline status
- Messages don't appear instantly

**Solutions:**
1. **Check Socket URL**
   \`\`\`env
   # In frontend/.env
   VITE_SOCKET_URL=http://localhost:5000
   \`\`\`

2. **Check browser console**
   - Open DevTools (F12)
   - Look for socket errors
   - Check Network tab

3. **Restart both servers**
   - Stop backend and frontend
   - Start backend first
   - Then start frontend

## 📦 Installation Issues

### Issue 12: "Module not found"

**Symptoms:**
- Error: "Cannot find module 'xyz'"
- Import errors

**Solutions:**
1. **Install dependencies**
   \`\`\`bash
   # Backend
   cd backend
   rm -rf node_modules
   npm install
   
   # Frontend
   cd frontend
   rm -rf node_modules
   npm install
   \`\`\`

2. **Check Node version**
   \`\`\`bash
   node --version  # Should be v14 or higher
   \`\`\`

3. **Clear npm cache**
   \`\`\`bash
   npm cache clean --force
   npm install
   \`\`\`

### Issue 13: "Port already in use"

**Symptoms:**
- Error: "EADDRINUSE: address already in use"
- Can't start server

**Solutions:**
1. **Kill process on port**
   \`\`\`bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   \`\`\`

2. **Use different port**
   \`\`\`env
   # In backend/.env
   PORT=5001
   \`\`\`

## ☁️ Cloudinary Issues

### Issue 14: "File upload failed"

**Symptoms:**
- Can't upload avatar
- Can't send images in chat
- Error: "Upload failed"

**Solutions:**
1. **Check Cloudinary credentials**
   \`\`\`env
   # In backend/.env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   \`\`\`

2. **Verify Cloudinary account**
   - Login to [Cloudinary](https://cloudinary.com)
   - Check Dashboard for credentials
   - Ensure account is active

3. **Check file size**
   - Max 5MB per file
   - Reduce file size if needed

4. **Check file type**
   - Allowed: jpg, png, gif, pdf, doc, docx
   - Other types will be rejected

## 🎨 Frontend Issues

### Issue 15: "Blank page"

**Symptoms:**
- Frontend shows blank page
- No errors in console

**Solutions:**
1. **Check browser console**
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R
   - Or clear cache in settings

3. **Check API URL**
   \`\`\`env
   # In frontend/.env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

4. **Rebuild frontend**
   \`\`\`bash
   cd frontend
   rm -rf node_modules dist
   npm install
   npm run dev
   \`\`\`

### Issue 16: "Dark mode not working"

**Symptoms:**
- Theme toggle doesn't work
- Stuck in light/dark mode

**Solutions:**
1. **Clear localStorage**
   \`\`\`javascript
   // In browser console
   localStorage.removeItem('theme')
   // Then refresh page
   \`\`\`

2. **Check Tailwind config**
   - Ensure darkMode: 'class' in tailwind.config.js

## 🧪 Testing Issues

### Issue 17: "Test email script fails"

**Symptoms:**
- \`npm run test:email\` fails
- Can't verify email config

**Solutions:**
1. **Check .env file exists**
   \`\`\`bash
   cd backend
   ls -la .env  # Should exist
   \`\`\`

2. **Check environment variables**
   \`\`\`bash
   # In backend folder
   node -e "require('dotenv').config(); console.log(process.env.EMAIL_USER)"
   \`\`\`

3. **Run with full path**
   \`\`\`bash
   cd backend
   node testEmail.js
   \`\`\`

## 🚀 Deployment Issues

### Issue 18: "Environment variables not working in production"

**Symptoms:**
- Works locally but not in production
- Missing configuration errors

**Solutions:**
1. **Set environment variables on hosting platform**
   - Render: Settings > Environment
   - Vercel: Settings > Environment Variables
   - Add all variables from .env

2. **Don't commit .env file**
   - Ensure .env is in .gitignore
   - Set variables manually on platform

3. **Check variable names**
   - Must match exactly
   - Case-sensitive

## 📞 Getting Help

If none of these solutions work:

1. **Check backend console**
   - Look for error messages
   - Note the exact error

2. **Check frontend console**
   - Open DevTools (F12)
   - Check Console and Network tabs

3. **Check logs**
   - Backend logs show detailed errors
   - Frontend console shows client errors

4. **Review documentation**
   - README.md
   - OTP_SETUP_GUIDE.md
   - QUICK_START.md

5. **Test with fresh setup**
   - Clone repository again
   - Follow QUICK_START.md
   - Compare with your setup

## ✅ Quick Diagnostic Checklist

Run through this checklist:

- [ ] Node.js installed (v14+)
- [ ] MongoDB running
- [ ] Backend .env file exists and configured
- [ ] Frontend .env file exists and configured
- [ ] Gmail App Password generated
- [ ] 2-Step Verification enabled
- [ ] Cloudinary account created
- [ ] Dependencies installed (npm install)
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/api/health
- [ ] Email test passes (npm run test:email)

## 🔍 Debug Mode

Enable detailed logging:

\`\`\`env
# In backend/.env
NODE_ENV=development
DEBUG=*
\`\`\`

This will show all debug messages in console.

---

**Still having issues?** Review the error message carefully and search for it in this guide.
