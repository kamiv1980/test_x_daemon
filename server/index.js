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

// Start the Server
app.listen(PORT, () => {
    console.log(`Log System Backend listening at http://localhost:${PORT}`);
    console.log('API Endpoints:');
    console.log(`  GET    http://localhost:${PORT}/logs`);
    console.log(`  POST   http://localhost:${PORT}/logs`);
    console.log(`  PUT    http://localhost:${PORT}/logs/:id`);
    console.log(`  DELETE http://localhost:${PORT}/logs/:id`);
});

// const express = require('express');
// const app = express();
//
// // ZERO middleware - тільки чистий Express
// app.get('/logs', (req, res) => {
//     console.log('GET /logs called directly');
//     res.json({ message: 'Working without any middleware' });
// });
//
// app.listen(3001, () => {
//     console.log('Super minimal server on :5000');
//     console.log('Try: http://localhost:3001/logs');
// });
