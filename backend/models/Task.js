const db = require("../config/db");

const TASK_COLUMNS = `
    task_id, priority_id, category_id, status, title, created_at, update_at
`;

/**
 * Creates a new task.
 *
 * @param {Object} task - Task data.
 * @param {number} task.priority_id - Priority ID.
 * @param {number} task.category_id - Category ID.
 * @param {string} task.status - Task status.
 * @param {string} task.title - Task title.
 * @returns {Promise<Object>} The database insert result.
 */
const createTask = async (task) => {
    const sql = `
        INSERT INTO tasks (priority_id, category_id, status, title)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        task.priority_id,
        task.category_id,
        task.status,
        task.title,
    ]);
    return result;
};

/**
 * Gets all tasks.
 *
 * @returns {Promise<Array>} An array of all tasks.
 */
const getAllTask = async () => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
};

/**
 * Gets a task by its ID.
 *
 * @param {number} id - The task ID.
 * @returns {Promise<Array>} An array containing the matching task.
 */
const getTaskById = async (id) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE task_id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows;
};

/**
 * Gets tasks by category.
 *
 * @param {number} category - The category ID.
 * @returns {Promise<Array>} An array of tasks in the category.
 */
const getTaskByCategory = async (category) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE category_id = ?
    `;
    const [rows] = await db.query(sql, [category]);
    return rows;
};

/**
 * Gets tasks by status.
 *
 * @param {string} status - The task status.
 * @returns {Promise<Array>} An array of tasks with the given status.
 */
const getTaskByStatus = async (status) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE status = ?
    `;
    const [rows] = await db.query(sql, [status]);
    return rows;
};

/**
 * Gets tasks by priority.
 *
 * @param {number} priority - The priority ID.
 * @returns {Promise<Array>} An array of tasks with the given priority.
 */
const getTaskByPriority = async (priority) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE priority_id = ?
    `;
    const [rows] = await db.query(sql, [priority]);
    return rows;
};

/**
 * Updates an existing task.
 *
 * @param {number} id - The task ID.
 * @param {Object} task - Updated task data.
 * @param {number} task.priority_id - Priority ID.
 * @param {number} task.category_id - Category ID.
 * @param {string} task.status - Task status.
 * @param {string} task.title - Task title.
 * @returns {Promise<Object>} The database update result.
 */
const updateTask = async (id, task) => {
    const sql = `
        UPDATE tasks
        SET
            priority_id = ?,
            category_id = ?,
            status = ?,
            title = ?
        WHERE task_id = ?
    `;
    const [result] = await db.query(sql, [
        task.priority_id,
        task.category_id,
        task.status,
        task.title,
        id,
    ]);
    return result;
};

/**
 * Deletes a task by its ID.
 *
 * @param {number} id - The task ID.
 * @returns {Promise<Object>} The database delete result.
 */
const deleteTask = async (id) => {
    const sql = `
        DELETE FROM tasks
        WHERE task_id = ?
    `;
    const [result] = await db.query(sql, [id]);
    return result;
};

/**
 * Searches for tasks by title.
 *
 * @param {string} keyword - The keyword to search for.
 * @returns {Promise<Array>} An array of matching tasks.
 */
const searchTask = async (keyword) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE title LIKE ?
        ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql, [`%${keyword}%`]);
    return rows;
};

module.exports = {
    createTask,
    getAllTask,
    getTaskById,
    getTaskByCategory,
    getTaskByStatus,
    getTaskByPriority,
    updateTask,
    deleteTask,
    searchTask,
};