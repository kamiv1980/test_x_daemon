let logs = []; // In-memory data store
let nextLogId = 1; // Counter for unique IDs

// Initial Data
for (let i = 1; i <= 15; i++) {
    const now = new Date().toISOString();
    logs.push({
        id: `log-${nextLogId++}`,
        owner: `User ${Math.ceil(Math.random() * 5)}`,
        createdAt: now,
        updatedAt: now,
        logText: `This is a sample log entry number ${i}. It contains some detailed information about an event that occurred.`,
    });
}

/**
 * Returns all log entries.
 * @returns {{data: *[]}} A copy of the logs array.
 */
const getLogs = (params) => {
    const {page, limit} = params;
    const totalPages = Math.ceil(logs.length/10);
    const data = logs.slice((page - 1) * limit, page * limit);
    return ({data, total: logs.length, totalPages}); // Return a copy to prevent direct mutation
};

/**
 * Adds a new log entry.
 * @param {Object} logData - The log data (owner, logText).
 * @returns {Object} The newly created log object.
 */
const addLog = (logData) => {
    const now = new Date().toISOString();
    const newLog = {
        id: `log-${nextLogId++}`,
        owner: logData.owner,
        createdAt: now,
        updatedAt: now,
        logText: logData.logText,
    };
    logs.unshift(newLog); // Add to the beginning
    return newLog;
};

/**
 * Updates an existing log entry by ID.
 * @param {string} id - The ID of the log to update.
 * @param {Object} updatedFields - The fields to update (owner, logText).
 * @returns {Object} The updated log object.
 * @throws {Error} If the log with the given ID is not found.
 */
const updateLogById = (id, updatedFields) => {
    const logIndex = logs.findIndex(log => log.id === id);
    if (logIndex === -1) {
        throw new Error('Log not found');
    }

    if (updatedFields.owner !== undefined) {
        logs[logIndex].owner = updatedFields.owner;
    }
    if (updatedFields.logText !== undefined) {
        logs[logIndex].logText = updatedFields.logText;
    }
    logs[logIndex].updatedAt = new Date().toISOString();

    return logs[logIndex];
};

/**
 * Deletes a log entry by ID.
 * @param {string} id - The ID of the log to delete.
 * @throws {Error} If the log with the given ID is not found.
 */
const deleteLogById = (id) => {
    const initialLength = logs.length;
    logs = logs.filter(log => log.id !== id);
    if (logs.length === initialLength) {
        throw new Error('Log not found for deletion');
    }
};

module.exports = {
    getLogs,
    addLog,
    updateLogById,
    deleteLogById,
};
