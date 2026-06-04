# 🔄 OTP Flow Diagrams

Visual representation of how OTP works in the Chat App.

## 📧 Registration with OTP Flow

\`\`\`
┌─────────────┐
│   User      │
│  Browser    │
└──────┬──────┘
       │
       │ 1. Fill registration form
       │    (name, email, username, password)
       ▼
┌─────────────────────────────────────┐
│  Frontend: RegisterPage.jsx         │
│  - Validates password                │
│  - Checks password match             │
│  - Sends POST /api/auth/register    │
└──────────────┬──────────────────────┘
               │
               │ 2. Registration request
               ▼
┌─────────────────────────────────────┐
│  Backend: authController.js         │
│  - Validates input                   │
│  - Checks if user exists             │
│  - Creates user in database          │
│  - Generates 6-digit OTP             │
│  - Saves OTP with 5-min expiry       │
└──────────────┬──────────────────────┘
               │
               │ 3. Generate & send OTP
               ▼
┌─────────────────────────────────────┐
│  Backend: sendEmail.js              │
│  - Connects to Gmail SMTP            │
│  - Verifies connection               │
│  - Sends beautiful HTML email        │
│  - Logs success/failure              │
└──────────────┬──────────────────────┘
               │
               │ 4. Email sent
               ▼
┌─────────────────────────────────────┐
│  Gmail Server                        │
│  - Receives email                    │
│  - Delivers to user's inbox          │
└──────────────┬──────────────────────┘
               │
               │ 5. User receives email
               ▼
┌─────────────────────────────────────┐
│  User's Email Inbox                  │
│  📧 Subject: Email Verification      │
│  🔐 OTP: 123456                      │
│  ⏰ Expires in 5 minutes             │
└──────────────┬──────────────────────┘
               │
               │ 6. User enters OTP
               ▼
┌─────────────────────────────────────┐
│  Frontend: OTPVerificationPage.jsx  │
│  - Shows OTP input                   │
│  - Displays countdown timer          │
│  - Sends POST /api/auth/verify-otp  │
└──────────────┬──────────────────────┘
               │
               │ 7. Verify OTP request
               ▼
┌─────────────────────────────────────┐
│  Backend: authController.js         │
│  - Finds user by ID                  │
│  - Checks OTP matches                │
│  - Checks OTP not expired            │
│  - Marks user as verified            │
│  - Clears OTP from database          │
│  - Generates JWT token               │
└──────────────┬──────────────────────┘
               │
               │ 8. Success response
               ▼
┌─────────────────────────────────────┐
│  Frontend: Redirect to Dashboard    │
│  - Saves token to localStorage       │
│  - Updates Redux state               │
│  - Shows success message             │
│  - User is now logged in             │
└─────────────────────────────────────┘
\`\`\`

## 🔑 Forgot Password Flow

\`\`\`
┌─────────────┐
│   User      │
│  Browser    │
└──────┬──────┘
       │
       │ 1. Click "Forgot Password"
       ▼
┌─────────────────────────────────────┐
│  Frontend: ForgotPasswordPage.jsx   │
│  - Shows email input                 │
│  - User enters email                 │
│  - Sends POST /api/auth/forgot-pwd  │
└──────────────┬──────────────────────┘
               │
               │ 2. Request password reset
               ▼
┌─────────────────────────────────────┐
│  Backend: authController.js         │
│  - Finds user by email               │
│  - Generates 6-digit OTP             │
│  - Saves OTP with 5-min expiry       │
│  - Sends password reset email        │
└──────────────┬──────────────────────┘
               │
               │ 3. Send reset email
               ▼
┌─────────────────────────────────────┐
│  Backend: sendEmail.js              │
│  - Sends password reset email        │
│  - With security warnings            │
└──────────────┬──────────────────────┘
               │
               │ 4. User receives email
               ▼
┌─────────────────────────────────────┐
│  User's Email Inbox                  │
│  📧 Subject: Password Reset OTP      │
│  🔐 OTP: 654321                      │
│  ⚠️  Security warning included       │
└──────────────┬──────────────────────┘
               │
               │ 5. User enters OTP & new password
               ▼
┌─────────────────────────────────────┐
│  Frontend: ResetPasswordPage.jsx    │
│  - Shows OTP input                   │
│  - Shows new password inputs         │
│  - Validates password                │
│  - Sends POST /api/auth/reset-pwd   │
└──────────────┬──────────────────────┘
               │
               │ 6. Reset password request
               ▼
┌─────────────────────────────────────┐
│  Backend: authController.js         │
│  - Verifies OTP                      │
│  - Validates new password            │
│  - Hashes new password               │
│  - Updates user password             │
│  - Clears OTP                        │
└──────────────┬──────────────────────┘
               │
               │ 7. Success response
               ▼
┌─────────────────────────────────────┐
│  Frontend: Redirect to Login        │
│  - Shows success message             │
│  - User can login with new password  │
└─────────────────────────────────────┘
\`\`\`

## 🔄 Resend OTP Flow

\`\`\`
┌─────────────┐
│   User      │
│  Browser    │
└──────┬──────┘
       │
       │ 1. Didn't receive OTP
       │    or OTP expired
       ▼
┌─────────────────────────────────────┐
│  Frontend: OTPVerificationPage.jsx  │
│  - Countdown timer reaches 0:00      │
│  - "Resend OTP" button enabled       │
│  - User clicks "Resend OTP"          │
│  - Sends POST /api/auth/resend-otp  │
└──────────────┬──────────────────────┘
               │
               │ 2. Resend OTP request
               ▼
┌─────────────────────────────────────┐
│  Backend: authController.js         │
│  - Finds user by ID                  │
│  - Generates NEW 6-digit OTP         │
│  - Invalidates old OTP               │
│  - Saves new OTP with fresh expiry   │
│  - Sends new email                   │
└──────────────┬──────────────────────┘
               │
               │ 3. Send new email
               ▼
┌─────────────────────────────────────┐
│  Backend: sendEmail.js              │
│  - Sends new OTP email               │
│  - With "Resent" in subject          │
└──────────────┬──────────────────────┘
               │
               │ 4. User receives new email
               ▼
┌─────────────────────────────────────┐
│  User's Email Inbox                  │
│  📧 Subject: Email Verification      │
│  🔐 NEW OTP: 789012                  │
│  ⏰ Fresh 5-minute timer             │
└──────────────┬──────────────────────┘
               │
               │ 5. User enters new OTP
               ▼
┌─────────────────────────────────────┐
│  Frontend: OTPVerificationPage.jsx  │
│  - OTP input cleared                 │
│  - Countdown timer reset to 5:00     │
│  - User enters new OTP               │
│  - Verification continues normally   │
└─────────────────────────────────────┘
\`\`\`

## ⏱️ Countdown Timer Flow

\`\`\`
┌─────────────────────────────────────┐
│  OTPVerificationPage.jsx            │
│                                      │
│  Initial State:                      │
│  countdown = 300 (5 minutes)         │
│  canResend = false                   │
└──────────────┬──────────────────────┘
               │
               │ Every 1 second
               ▼
┌─────────────────────────────────────┐
│  useEffect Hook                      │
│  - Decrements countdown by 1         │
│  - Updates display: "4:59"           │
│  - Continues until countdown = 0     │
└──────────────┬──────────────────────┘
               │
               │ When countdown reaches 0
               ▼
┌─────────────────────────────────────┐
│  Timer Expired                       │
│  - Display: "OTP Expired"            │
│  - canResend = true                  │
│  - "Resend OTP" button enabled       │
│  - Verify button disabled            │
└──────────────┬──────────────────────┘
               │
               │ User clicks "Resend OTP"
               ▼
┌─────────────────────────────────────┐
│  Resend Handler                      │
│  - Sends resend request              │
│  - Resets countdown = 300            │
│  - Sets canResend = false            │
│  - Clears OTP input                  │
│  - Timer starts again                │
└─────────────────────────────────────┘
\`\`\`

## 🔐 OTP Security Flow

\`\`\`
┌─────────────────────────────────────┐
│  OTP Generation                      │
│  - Random 6-digit number             │
│  - Range: 100000 - 999999            │
│  - Stored in database                │
│  - Expiry time set (5 minutes)       │
└──────────────┬──────────────────────┘
               │
               │ OTP Verification Checks
               ▼
┌─────────────────────────────────────┐
│  1. OTP Exists?                      │
│     ├─ No  → Error: "No OTP found"   │
│     └─ Yes → Continue                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. OTP Expired?                     │
│     ├─ Yes → Error: "OTP expired"    │
│     └─ No  → Continue                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. OTP Matches?                     │
│     ├─ No  → Error: "Invalid OTP"    │
│     └─ Yes → Continue                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Verification Success             │
│     - Mark user as verified          │
│     - Clear OTP from database        │
│     - Clear expiry time              │
│     - Generate JWT token             │
│     - Return success response        │
└─────────────────────────────────────┘
\`\`\`

## 📊 Database State Changes

\`\`\`
User Registration:
┌─────────────────────────────────────┐
│  User Document (Before OTP)          │
│  {                                   │
│    email: "user@example.com",        │
│    password: "hashed_password",      │
│    isVerified: false,                │
│    otp: undefined,                   │
│    otpExpiry: undefined              │
│  }                                   │
└──────────────┬──────────────────────┘
               │
               │ After OTP Generation
               ▼
┌─────────────────────────────────────┐
│  User Document (With OTP)            │
│  {                                   │
│    email: "user@example.com",        │
│    password: "hashed_password",      │
│    isVerified: false,                │
│    otp: "123456",                    │
│    otpExpiry: 1234567890123          │
│  }                                   │
└──────────────┬──────────────────────┘
               │
               │ After Verification
               ▼
┌─────────────────────────────────────┐
│  User Document (Verified)            │
│  {                                   │
│    email: "user@example.com",        │
│    password: "hashed_password",      │
│    isVerified: true,                 │
│    otp: undefined,                   │
│    otpExpiry: undefined              │
│  }                                   │
└─────────────────────────────────────┘
\`\`\`

## 🎨 Email Template Structure

\`\`\`
┌─────────────────────────────────────┐
│  Email HTML Structure                │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Header (Gradient)           │    │
│  │  - App Logo/Name             │    │
│  │  - Welcome Message           │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Content Area                │    │
│  │  - Greeting                  │    │
│  │  - Instructions              │    │
│  │                              │    │
│  │  ┌─────────────────────┐    │    │
│  │  │  OTP Box (Dashed)    │    │    │
│  │  │                      │    │    │
│  │  │    1 2 3 4 5 6       │    │    │
│  │  │                      │    │    │
│  │  └─────────────────────┘    │    │
│  │                              │    │
│  │  - Expiry Information        │    │
│  │  - Security Warnings         │    │
│  └─────────────────────────────┘    │
│                                      │
│  ┌─────────────────────────────┐    │
│  │  Footer                      │    │
│  │  - Copyright                 │    │
│  │  - Year                      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
\`\`\`

## 🔄 Complete System Flow

\`\`\`
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Frontend │────▶│ Backend  │────▶│ Database │     │  Gmail   │
│  React   │     │ Express  │     │ MongoDB  │     │  SMTP    │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                 │                 │
     │ 1. Register    │                 │                 │
     │───────────────▶│                 │                 │
     │                │ 2. Save User    │                 │
     │                │────────────────▶│                 │
     │                │                 │                 │
     │                │ 3. Generate OTP │                 │
     │                │────────────────▶│                 │
     │                │                 │                 │
     │                │ 4. Send Email   │                 │
     │                │─────────────────────────────────▶│
     │                │                 │                 │
     │                │◀─────────────────────────────────│
     │                │ 5. Email Sent   │                 │
     │                │                 │                 │
     │◀───────────────│                 │                 │
     │ 6. Success     │                 │                 │
     │                │                 │                 │
     │ 7. Enter OTP   │                 │                 │
     │───────────────▶│                 │                 │
     │                │ 8. Verify OTP   │                 │
     │                │────────────────▶│                 │
     │                │                 │                 │
     │                │◀────────────────│                 │
     │                │ 9. OTP Valid    │                 │
     │                │                 │                 │
     │◀───────────────│                 │                 │
     │ 10. JWT Token  │                 │                 │
     │                │                 │                 │
\`\`\`

## 📝 Key Points

### OTP Generation:
- ✅ 6 random digits (100000-999999)
- ✅ Stored in database with user
- ✅ 5-minute expiry timestamp
- ✅ Logged in console (dev only)

### Email Sending:
- ✅ Gmail SMTP (smtp.gmail.com:587)
- ✅ TLS encryption
- ✅ Beautiful HTML template
- ✅ Transporter verification
- ✅ Error handling with helpful messages

### OTP Verification:
- ✅ Check OTP exists
- ✅ Check not expired
- ✅ Check matches entered value
- ✅ Clear OTP after success
- ✅ Generate JWT token

### Security:
- ✅ OTP expires after 5 minutes
- ✅ OTP deleted after verification
- ✅ Old OTP invalid after resend
- ✅ Rate limiting with countdown
- ✅ Password hashing with bcrypt

### User Experience:
- ✅ Countdown timer visible
- ✅ Resend button with timer
- ✅ Loading states
- ✅ Clear error messages
- ✅ Success confirmations

---

**Visual Guide Version:** 1.0.0
**Last Updated:** 2024
