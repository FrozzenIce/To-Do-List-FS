const db = require("../config/db");

const TASK_COLUMNS = `
    task_id, priority_id, category_id, status, title, created_at, update_at
`;

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

const getAllTask = async () => {
    const sql = `SELECT ${TASK_COLUMNS} FROM tasks ORDER BY created_at DESC`;
    const [rows] = await db.query(sql);
    return rows;
};

const getTaskById = async (id) => {
    const sql = `SELECT ${TASK_COLUMNS} FROM tasks WHERE task_id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows;
};

const getTaskByCategory = async (category) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE category_id = ?
    `;
    const [rows] = await db.query(sql , [category]);
    return rows;
};

const getTaskByStatus = async (status) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE status = ?
    `;
    const [rows] = await db.query(sql, [status]);
    return rows;
};

const getTaskByPriority = async (priority) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE priority_id = ?
    `;
    const [rows] = await db.query(sql, [priority]);
    return rows;
};

const updateTask = async (id, task) => {
    const sql = `
        UPDATE tasks
        SET
        priority_id = ?,
        category_id = ?,
        status = ?,
        title = ?,
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

const deleteTask = async (id) => {
    const sql = `
        DELETE FROM tasks
        WHERE task_id = ?
    `;
    const [result] = await db.query(sql, [id]);
    return result;
};

const searchTask = async (keyword) => {
    const sql = `
        SELECT ${TASK_COLUMNS}
        FROM tasks
        WHERE title LIKE ?
        ORDER BY create_at DESC    
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
    searchTask
}