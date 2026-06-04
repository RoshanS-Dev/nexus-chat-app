# 🗄️ Database Management Guide

Complete guide for managing your Chat App database during development and testing.

## 📋 Available Commands

### 1. List All Users
View all registered users in the database.

\`\`\`bash
cd backend
npm run db:list
\`\`\`

**Output:**
\`\`\`
📋 List All Users

📡 Connecting to MongoDB...
✅ Connected to MongoDB

📊 Total Users: 3

═══════════════════════════════════════════════════════════════════════════════

👤 User #1
───────────────────────────────────────────────────────────────────────────────
   Name:       John Doe
   Username:   johndoe
   Email:      john@example.com
   Mobile:     1234567890
   Verified:   ✅ Yes
   Status:     offline
   Theme:      light
   Created:    1/15/2024, 10:30:00 AM
   Last Seen:  1/15/2024, 2:45:00 PM

👤 User #2
───────────────────────────────────────────────────────────────────────────────
   Name:       Jane Smith
   Username:   janesmith
   Email:      jane@example.com
   Mobile:     0987654321
   Verified:   ✅ Yes
   Status:     online
   Theme:      dark
   Created:    1/16/2024, 9:15:00 AM
   Last Seen:  1/16/2024, 3:20:00 PM
\`\`\`

### 2. Delete User by Email
Delete a specific user and all their related data.

\`\`\`bash
cd backend
npm run db:delete user@example.com
\`\`\`

**Or directly:**
\`\`\`bash
cd backend
node deleteUserByEmail.js user@example.com
\`\`\`

**Output:**
\`\`\`
🗑️  Delete User by Email

📧 Email to delete: user@example.com

📡 Connecting to MongoDB...
✅ Connected to MongoDB

🔍 Searching for user...
✅ User found!

👤 User Details:
   Name: John Doe
   Username: johndoe
   Email: user@example.com
   Mobile: 1234567890
   Verified: Yes
   Created: Mon Jan 15 2024 10:30:00

📊 Related Data:
   Messages sent: 25
   Messages received: 18
   Groups joined: 3
   Groups admin: 1

🗑️  Deleting user...
✅ User deleted successfully!
🗑️  Deleting related messages...
✅ Deleted 43 messages
🗑️  Removing user from groups...
✅ Removed from 3 groups
🗑️  Deleting groups where user is admin...
✅ Deleted 1 groups

✅ ========================================
✅ USER DELETED SUCCESSFULLY!
✅ ========================================

📧 Email: user@example.com
🗑️  All related data has been cleaned up
\`\`\`

### 3. Clear Entire Database
Delete ALL users, messages, and groups. **Use with caution!**

\`\`\`bash
cd backend
npm run db:clear
\`\`\`

**Output:**
\`\`\`
🗑️  Database Cleanup Utility

📡 Connecting to MongoDB...
✅ Connected to MongoDB

📊 Current Database Status:
   Users: 5
   Messages: 127
   Groups: 8

⚠️  WARNING: This will delete ALL data from the database!

🗑️  Deleting all users...
✅ Deleted 5 users
🗑️  Deleting all messages...
✅ Deleted 127 messages
🗑️  Deleting all groups...
✅ Deleted 8 groups

✅ ========================================
✅ DATABASE CLEARED SUCCESSFULLY!
✅ ========================================

📊 Final Database Status:
   Users: 0
   Messages: 0
   Groups: 0

💡 You can now register new users for testing
\`\`\`

## 🎯 Common Use Cases

### Use Case 1: Testing Registration
You want to test the registration flow multiple times with the same email.

**Solution:**
\`\`\`bash
# Delete the test user
npm run db:delete test@example.com

# Now you can register again with the same email
\`\`\`

### Use Case 2: Fresh Start
You want to start with a clean database for testing.

**Solution:**
\`\`\`bash
# Clear everything
npm run db:clear

# Database is now empty, ready for fresh testing
\`\`\`

### Use Case 3: Check Registered Users
You want to see who's registered in your database.

**Solution:**
\`\`\`bash
# List all users
npm run db:list
\`\`\`

### Use Case 4: Remove Duplicate Test Accounts
You created multiple test accounts and want to clean up.

**Solution:**
\`\`\`bash
# Delete each test account
npm run db:delete test1@example.com
npm run db:delete test2@example.com
npm run db:delete test3@example.com

# Or clear everything
npm run db:clear
\`\`\`

### Use Case 5: Delete Unverified Users
You want to remove users who never verified their email.

**Solution:**
\`\`\`bash
# First, list all users to see who's unverified
npm run db:list

# Then delete unverified users one by one
npm run db:delete unverified@example.com
\`\`\`

## 🔧 Direct MongoDB Commands

If you prefer using MongoDB directly:

### Connect to MongoDB
\`\`\`bash
# Local MongoDB
mongo
# or
mongosh

# MongoDB Atlas
mongosh "mongodb+srv://cluster.mongodb.net/chat-app" --username your_username
\`\`\`

### List All Users
\`\`\`javascript
use chat-app
db.users.find().pretty()
\`\`\`

### Count Users
\`\`\`javascript
db.users.countDocuments()
\`\`\`

### Find User by Email
\`\`\`javascript
db.users.findOne({ email: "user@example.com" })
\`\`\`

### Delete User by Email
\`\`\`javascript
db.users.deleteOne({ email: "user@example.com" })
\`\`\`

### Delete All Users
\`\`\`javascript
db.users.deleteMany({})
\`\`\`

### Delete All Collections
\`\`\`javascript
db.users.deleteMany({})
db.messages.deleteMany({})
db.groups.deleteMany({})
\`\`\`

### Find Unverified Users
\`\`\`javascript
db.users.find({ isVerified: false }).pretty()
\`\`\`

### Delete Unverified Users
\`\`\`javascript
db.users.deleteMany({ isVerified: false })
\`\`\`

## 📊 Database Statistics

### Get Database Stats
\`\`\`javascript
use chat-app
db.stats()
\`\`\`

### Get Collection Stats
\`\`\`javascript
db.users.stats()
db.messages.stats()
db.groups.stats()
\`\`\`

### Count Documents
\`\`\`javascript
db.users.countDocuments()
db.messages.countDocuments()
db.groups.countDocuments()
\`\`\`

## 🛡️ Safety Tips

### Before Deleting:
1. **Backup your data** (if important)
   \`\`\`bash
   mongodump --db chat-app --out ./backup
   \`\`\`

2. **List users first** to see what will be deleted
   \`\`\`bash
   npm run db:list
   \`\`\`

3. **Double-check the email** before deleting
   \`\`\`bash
   npm run db:delete user@example.com  # Make sure email is correct
   \`\`\`

### After Deleting:
1. **Verify deletion** by listing users again
   \`\`\`bash
   npm run db:list
   \`\`\`

2. **Test registration** to ensure everything works
   \`\`\`bash
   # Go to http://localhost:3000/register
   # Register a new user
   \`\`\`

## 🔄 Restore from Backup

If you backed up your database:

\`\`\`bash
# Restore from backup
mongorestore --db chat-app ./backup/chat-app
\`\`\`

## 🐛 Troubleshooting

### Error: "ECONNREFUSED"
**Problem:** Can't connect to MongoDB

**Solution:**
\`\`\`bash
# Make sure MongoDB is running
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or check if MongoDB is running
mongo --eval "db.version()"
\`\`\`

### Error: "User not found"
**Problem:** Email doesn't exist in database

**Solution:**
\`\`\`bash
# List all users to see available emails
npm run db:list

# Make sure you're using the correct email
# Email is case-sensitive
\`\`\`

### Error: "Database is empty"
**Problem:** No users in database

**Solution:**
\`\`\`bash
# Register a new user
# Go to http://localhost:3000/register
# Or restore from backup
mongorestore --db chat-app ./backup/chat-app
\`\`\`

## 📝 Script Files

All database management scripts are located in:
\`\`\`
chat-app/backend/
├── clearDatabase.js       # Clear entire database
├── deleteUserByEmail.js   # Delete specific user
└── listAllUsers.js        # List all users
\`\`\`

## 🎓 Best Practices

### Development:
1. **Use test emails** for development
   - test1@example.com
   - test2@example.com
   - etc.

2. **Clear database regularly** to start fresh
   \`\`\`bash
   npm run db:clear
   \`\`\`

3. **List users** before and after operations
   \`\`\`bash
   npm run db:list
   \`\`\`

### Testing:
1. **Create test accounts** with predictable data
2. **Delete test accounts** after testing
3. **Use different emails** for different test scenarios

### Production:
1. **Never use these scripts** in production
2. **Backup before any deletion**
3. **Use proper admin panel** for user management
4. **Implement soft delete** instead of hard delete

## ⚠️ Important Notes

1. **These scripts are for DEVELOPMENT only**
   - Do not use in production
   - They permanently delete data
   - No confirmation prompts

2. **Deletion is permanent**
   - Deleted data cannot be recovered
   - Always backup important data
   - Test with dummy data first

3. **Related data is also deleted**
   - User's messages
   - User's groups
   - User's group memberships

4. **Database must be running**
   - MongoDB must be started
   - Connection string must be correct
   - .env file must be configured

## 🚀 Quick Reference

\`\`\`bash
# List all users
npm run db:list

# Delete specific user
npm run db:delete user@example.com

# Clear entire database
npm run db:clear

# Test email configuration
npm run test:email

# Start backend server
npm run dev
\`\`\`

## 📞 Need Help?

If you encounter issues:
1. Check MongoDB is running
2. Verify .env configuration
3. Check console error messages
4. Review TROUBLESHOOTING.md

---

**Last Updated:** 2024
**Version:** 1.0.0
