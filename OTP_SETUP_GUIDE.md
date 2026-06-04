# 📧 OTP Email Setup Guide - Complete Walkthrough

This guide will help you set up OTP email functionality for your Chat App.

## 🎯 Overview

The OTP (One-Time Password) system is used for:
1. **Email Verification** during registration
2. **Password Reset** when users forget their password
3. **Account Security** verification

## 📋 Prerequisites

- Gmail account
- 2-Step Verification enabled on Gmail
- Backend server running

## 🔧 Step-by-Step Setup

### Step 1: Enable 2-Step Verification on Gmail

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **"Security"** in the left sidebar
3. Scroll down to **"Signing in to Google"**
4. Click **"2-Step Verification"**
5. Click **"Get Started"**
6. Follow the prompts to set up 2-Step Verification using your phone number
7. Complete the verification process

### Step 2: Generate Gmail App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Under **"Signing in to Google"**, click **"App passwords"**
   - If you don't see this option, make sure 2-Step Verification is enabled
3. You may need to sign in again
4. At the bottom, select:
   - **Select app:** Choose "Mail"
   - **Select device:** Choose "Other (Custom name)"
5. Enter a name like **"Chat App"**
6. Click **"Generate"**
7. Google will show you a 16-character password like: `abcd efgh ijkl mnop`
8. **IMPORTANT:** Copy this password immediately (you won't see it again)

### Step 3: Configure Backend Environment Variables

1. Navigate to your backend folder:
   \`\`\`bash
   cd chat-app/backend
   \`\`\`

2. Open the `.env` file (create it if it doesn't exist):
   \`\`\`bash
   # Windows
   notepad .env
   
   # Mac/Linux
   nano .env
   \`\`\`

3. Add these lines (replace with your actual values):
   \`\`\`env
   # Email Configuration
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   
   # OTP Configuration
   OTP_EXPIRE_MINUTES=5
   \`\`\`

4. **IMPORTANT NOTES:**
   - Remove ALL spaces from the App Password
   - Use the App Password, NOT your regular Gmail password
   - Keep this file secure and never commit it to Git

### Step 4: Verify Configuration

1. Start your backend server:
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

2. You should see:
   \`\`\`
   Server running on port 5000
   MongoDB Connected: localhost
   \`\`\`

3. Test the email configuration by registering a new user

## 🧪 Testing OTP Functionality

### Test 1: Registration OTP

1. Go to http://localhost:3000/register
2. Fill in the registration form:
   - Full Name: Test User
   - Username: testuser
   - Email: your-test-email@gmail.com
   - Mobile: 1234567890
   - Password: Test@123
   - Confirm Password: Test@123
3. Click "Sign Up"
4. Check backend console for logs:
   \`\`\`
   🔐 Generated OTP for user: your-test-email@gmail.com | OTP: 123456
   📧 Attempting to send email to: your-test-email@gmail.com
   ✅ Email sent successfully!
   \`\`\`
5. Check your email inbox (and spam folder)
6. You should receive an email with a 6-digit OTP
7. Enter the OTP on the verification page
8. You should be logged in successfully

### Test 2: Forgot Password OTP

1. Go to http://localhost:3000/forgot-password
2. Enter your registered email
3. Click "Send OTP"
4. Check your email for the OTP
5. Enter OTP and new password
6. Try logging in with the new password

### Test 3: Resend OTP

1. During OTP verification, wait for the countdown timer
2. Click "Resend OTP" when available
3. Check your email for the new OTP
4. Verify that the old OTP no longer works

## 🐛 Troubleshooting

### Problem: "Email sending failed: Invalid login"

**Solution:**
1. Double-check your EMAIL_USER is correct
2. Verify you're using the App Password, not regular password
3. Make sure there are no spaces in EMAIL_PASS
4. Regenerate a new App Password and try again

### Problem: "Authentication failed"

**Solution:**
1. Confirm 2-Step Verification is enabled
2. Generate a new App Password
3. Update .env file with the new password
4. Restart the backend server

### Problem: "Email not received"

**Solution:**
1. Check spam/junk folder
2. Verify the email address is correct
3. Check backend console for error messages
4. Try with a different email address
5. Wait a few minutes (sometimes there's a delay)

### Problem: "OTP expired"

**Solution:**
1. OTP expires after 5 minutes by default
2. Click "Resend OTP" to get a new one
3. You can change expiry time in .env:
   \`\`\`env
   OTP_EXPIRE_MINUTES=10
   \`\`\`

### Problem: Backend console shows "ECONNECTION"

**Solution:**
1. Check your internet connection
2. Verify Gmail SMTP is not blocked by firewall
3. Try using a different network

## 📊 Understanding the Logs

### Successful Email Sending:
\`\`\`
📧 Attempting to send email to: user@example.com
📧 Using email account: youremail@gmail.com
🔍 Verifying email transporter...
✅ Email transporter verified successfully
📤 Sending email...
✅ Email sent successfully!
📬 Message ID: <unique-message-id>
📨 Response: 250 2.0.0 OK
\`\`\`

### Failed Email Sending:
\`\`\`
❌ Email sending failed: Invalid login: 535-5.7.8 Username and Password not accepted
❌ Authentication failed. Please check:
   1. EMAIL_USER is correct
   2. EMAIL_PASS is a Gmail App Password (not regular password)
   3. 2-Step Verification is enabled on your Gmail account
\`\`\`

## 🔒 Security Best Practices

1. **Never commit .env file to Git**
   - Add `.env` to `.gitignore`
   - Use `.env.example` for documentation

2. **Use different App Passwords for different apps**
   - Generate separate passwords for development and production
   - Revoke unused App Passwords

3. **Rotate App Passwords regularly**
   - Change passwords every few months
   - Update .env file after rotation

4. **Monitor email sending**
   - Check Gmail's "Sent" folder
   - Monitor for suspicious activity

## 📧 Email Template Customization

The OTP emails are sent with HTML templates. To customize:

1. Open `backend/controllers/authController.js`
2. Find the `sendEmail` function calls
3. Modify the HTML in the `html` parameter
4. Restart the backend server

Example:
\`\`\`javascript
await sendEmail({
  email: user.email,
  subject: 'Your Custom Subject',
  html: \`
    <h1>Your Custom HTML</h1>
    <p>OTP: <strong>\${otp}</strong></p>
  \`,
});
\`\`\`

## 🎨 OTP Email Features

Current email templates include:
- ✅ Professional HTML design
- ✅ Responsive layout
- ✅ Clear OTP display
- ✅ Expiry time information
- ✅ Security warnings
- ✅ Branded header and footer

## 📱 Testing with Different Email Providers

While this guide focuses on Gmail, you can use other providers:

### Outlook/Hotmail:
\`\`\`env
EMAIL_USER=youremail@outlook.com
EMAIL_PASS=your_outlook_password
\`\`\`
Update `sendEmail.js` to use Outlook SMTP settings.

### Custom SMTP:
\`\`\`env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your_password
\`\`\`

## 🚀 Production Deployment

For production:

1. Use environment variables on your hosting platform
2. Never hardcode credentials
3. Use a dedicated email service (SendGrid, AWS SES, etc.) for better deliverability
4. Monitor email sending rates and limits
5. Implement rate limiting to prevent abuse

## 📞 Support

If you're still having issues:

1. Check the main README.md file
2. Review backend console logs carefully
3. Test with a fresh Gmail account
4. Verify all environment variables are set correctly

## ✅ Checklist

Before going live, ensure:

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated and saved
- [ ] .env file configured correctly
- [ ] Backend server starts without errors
- [ ] Test registration OTP works
- [ ] Test forgot password OTP works
- [ ] Test resend OTP works
- [ ] Emails arrive in inbox (not spam)
- [ ] OTP expiry works correctly
- [ ] .env file is in .gitignore

## 🎉 Success!

If you've followed all steps and OTP emails are working, congratulations! Your chat app now has a fully functional email verification system.

---

**Last Updated:** 2024
**Version:** 1.0.0
