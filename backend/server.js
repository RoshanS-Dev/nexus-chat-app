import express from 'express';
import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();
console.log('Environment variables loaded');

// Validate critical environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingRequired = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingRequired.length > 0) {
  console.error('❌ CRITICAL ERROR: Missing required environment variables:');
  missingRequired.forEach(varName => console.error(`   - ${varName}`));
  console.error('Please configure these in your .env file or deployment environment.');
  process.exit(1);
}

// Log recommended service configuration
const recommendedEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS'
];
const missingRecommended = recommendedEnvVars.filter(varName => !process.env[varName]);
if (missingRecommended.length > 0) {
  console.warn('⚠️ WARNING: Missing recommended environment variables (some features may fail):');
  missingRecommended.forEach(varName => console.warn(`   - ${varName}`));
} else {
  console.log('✅ All recommended service environment variables are configured.');
}

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import { initializeSocket } from './socket/socketHandler.js';

// Import Cloudinary config to ensure it's initialized
import './config/cloudinary.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Import error middleware
import { errorHandler } from './middleware/errorMiddleware.js';

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Connect to Database
connectDB();

// Initialize Socket.IO handlers
initializeSocket(io);

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/notifications', notificationRoutes);

// Health checks
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = parseInt(process.env.PORT, 10) || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

httpServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use. Please stop the other process or set a different PORT.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Frontend origin allowed: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
