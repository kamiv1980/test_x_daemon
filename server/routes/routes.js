const express = require('express');
const {
    getLogs,
    addLog,
    updateLogById,
    deleteLogById
} = require('../data/data'); // Import data access functions

const router = express.Router(); // Create a new Express router

// Simulate network latency for all API calls
const simulateLatency = (req, res, next) => {
    setTimeout(() => {
        next(); // Continue to the next middleware/route handler after a delay
    }, 500);
};

// Apply latency middleware to all log routes
router.use(simulateLatency);

// GET /logs: Fetch all logs
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log('GET /logs - Fetching all logs');
    res.status(200).json(getLogs({page, limit}));
});

// POST /logs: Create a new log
router.post('/', (req, res) => {
    const { owner, logText } = req.body;

    if (!owner || !logText) {
        console.warn('POST /logs - Missing owner or logText in request body');
        return res.status(400).json({ message: 'Owner and logText are required.' });
    }

    const newLog = addLog({ owner, logText });
    console.log('POST /logs - New log created:', newLog);
    res.status(201).json(newLog);
});

// PUT /logs/:id: Update a log
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { owner, logText } = req.body;

    try {
        const updatedLog = updateLogById(id, { owner, logText });
        console.log(`PUT /logs/${id} - Log updated:`, updatedLog);
        res.status(200).json(updatedLog);
    } catch (error) {
        console.warn(`PUT /logs/${id} - ${error.message}`);
        res.status(404).json({ message: error.message });
    }
});

// DELETE /logs/:id: Delete a log
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        deleteLogById(id);
        console.log(`DELETE /logs/${id} - Log deleted successfully`);
        res.status(200).json(`Log ${id} deleted`);
    } catch (error) {
        console.warn(`DELETE /logs/${id} - ${error.message}`);
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
