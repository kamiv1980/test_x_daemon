const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logRoutes = require('./routes/routes'); // Import log routes
const app = express();
const PORT = 3001;

// Middleware Setup
app.use(cors({
    origin: true,
    credentials: true
})); // Enable CORS

app.use(bodyParser.json()); // Parse JSON request bodies

// API Routes
// All routes defined in logRoutes.js will be prefixed with '/logs'
// app.options('*', cors());
app.use('/logs', logRoutes);

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve index.html for any other route (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Log System Backend listening at http://localhost:${PORT}`);
    console.log('API Endpoints:');
    console.log(`  GET    http://localhost:${PORT}/logs`);
    console.log(`  POST   http://localhost:${PORT}/logs`);
    console.log(`  PUT    http://localhost:${PORT}/logs/:id`);
    console.log(`  DELETE http://localhost:${PORT}/logs/:id`);
});
