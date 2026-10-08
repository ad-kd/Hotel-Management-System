const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ["https://hotel-management-system-five-dun.vercel.app"]
    : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (e.g., curl, mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Hotel Management API is running...');
});

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Export the app for Vercel
module.exports = app;

const PORT = process.env.PORT || 5000;

// Only listen if not running as a serverless function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
