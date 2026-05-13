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
app.use(cors());
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
