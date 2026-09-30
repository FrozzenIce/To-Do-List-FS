const db = require('../config/db');

/**
 * Get all priorities
 */
const getAllPriorities = async () => {
    const sql = `
        SELECT * FROM priorities
    `;

    const [rows] = await db.query(sql);
    return rows;
}

/**
 * Get all priorities by id
 */
const getPriorityById = async (priorityId) => {
    const sql = `
        SELECT * FROM priorities
        WHERE priority_id = ?
    `;

    const [rows] = await db.query(sql, [priorityId]);
    return rows;
}

module.exports = {
    getAllPriorities,
    getPriorityById
}