const db = require("../config/db");

const TASK_COLUMNS = `
    task_id, priority_id, category_id, status, title, created_at, updated_at
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
        INSERT INTO tasks (priority_id, category_id, status, title, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        task.priority_id,
        task.category_id,
        task.status,
        task.title,
        task.user_id,
    ]);
    return result;
};

/**
 * Gets all tasks.
 *
 * @returns {Promise<Array>} An array of all tasks.
 */
const getAllTask = async (userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
};

/**
 * Gets a task by its ID.
 *
 * @param {number} id - The task ID.
 * @returns {Promise<Array>} An array containing the matching task.
 */
const getTaskById = async (id, userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE task_id = ? AND user_id = ?
    `;
    const [rows] = await db.query(sql, [id, userId]);
    return rows;
};

/**
 * Gets tasks by category.
 *
 * @param {number} category - The category ID.
 * @returns {Promise<Array>} An array of tasks in the category.
 */
const getTaskByCategory = async (categoryId, userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE category_id = ? AND user_id = ?
    `;
    const [rows] = await db.query(sql, [categoryId, userId]);
    return rows;
};

/**
 * Gets tasks by status.
 *
 * @param {string} status - The task status.
 * @returns {Promise<Array>} An array of tasks with the given status.
 */
const getTaskByStatus = async (status, userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE status = ? AND user_id = ?
    `;
    const [rows] = await db.query(sql, [status, userId]);
    return rows;
};

/**
 * Gets tasks by priority.
 *
 * @param {number} priority - The priority ID.
 * @returns {Promise<Array>} An array of tasks with the given priority.
 */
const getTaskByPriority = async (priority, userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE priority_id = ? AND user_id = ?
    `;
    const [rows] = await db.query(sql, [priority, userId]);
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
const updateTask = async (id, task, userId) => {
    const sql = `
        UPDATE tasks
        SET
            priority_id = ?,
            category_id = ?,
            status = ?,
            title = ?
        WHERE task_id = ? AND user_id = ?
    `;
    const [result] = await db.query(sql, [
        task.priority_id,
        task.category_id,
        task.status,
        task.title,
        id,
        userId
    ]);
    return result;
};

/**
 * Deletes a task by its ID.
 *
 * @param {number} id - The task ID.
 * @returns {Promise<Object>} The database delete result.
 */
const deleteTask = async (id, userId) => {
    const sql = `
        DELETE FROM tasks
        WHERE task_id = ? AND user_id = ?
    `;
    const [result] = await db.query(sql, [id, userId]);
    return result;
};

/**
 * Searches for tasks by title.
 *
 * @param {string} keyword - The keyword to search for.
 * @returns {Promise<Array>} An array of matching tasks.
 */
const searchTask = async (keyword, userId) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE title LIKE ? AND user_id = ?
        ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql, [`%${keyword}%`, userId]);
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