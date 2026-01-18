const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

/* ======================
   Security & Logging
====================== */
app.use(helmet());
app.use(morgan('dev'));

/* ======================
   Body Parsers
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   CORS Setup (FIXED)
====================== */
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-manegment-app.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, Postman, Render health checks
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

/* ======================
   Database Connection
====================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

/* ======================
   API Routes
====================== */
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

/* ======================
   Health Check
====================== */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'Task Management API',
    timestamp: new Date().toISOString()
  });
});

/* ======================
   Root Route
====================== */
app.get('/', (req, res) => {
  res.send('🚀 Task Management API is running');
});

/* ======================
   Error Handler
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS Error: Origin not allowed'
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

/* ======================
   404 Handler
====================== */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

/* ======================
   Start Server (Render)
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
