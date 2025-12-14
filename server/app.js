require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/index');
const fs = require('fs');
const cors = require('cors');

// Initialize Express App
const app = express();

// Connect to MongoDB
db.connectDB();

// Middleware
app.use(express.json());

// CORS
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Auto-load all routes from /routes
fs.readdirSync('./routes').forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        const routeName = file.replace('.js', '');
        app.use(`/api/${routeName}`, route);
    }
});

// JWT Authentication

// Default Route
if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => res.json({ message: 'API running' }));
}

// React Frontend
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'frontend', 'build');
  app.use(express.static(buildPath));
  app.get('*', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));