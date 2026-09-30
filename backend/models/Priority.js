const db = require('../config/db');

/**
 * Get all priorities.
 *
 * @returns {Promise<Array>} An array of all priorities.
 */
const getAllPriorities = async () => {
    const sql = `
        SELECT * FROM priorities
    `;

    const [rows] = await db.query(sql);
    return rows;
};

/**
 * Get a priority by ID.
 *
 * @param {number} priorityId - Priority ID.
 * @returns {Promise<Array>} An array containing the matching priority records.
 */
const getPriorityById = async (priorityId) => {
    const sql = `
        SELECT * FROM priorities
        WHERE priority_id = ?
    `;

    const [rows] = await db.query(sql, [priorityId]);
    return rows;
};

module.exports = {
    getAllPriorities,
    getPriorityById
};