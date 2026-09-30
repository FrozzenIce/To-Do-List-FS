const Task = require('../models/Task');

/**
 * Create a task.
 *
 * @param {Object} req.body - Task data submitted by the user.
 * @returns {Promise<void>} Sends a JSON response containing the created task ID.
 * @throws {Error} Passes errors from task creation to the error-handling middleware.
 */
exports.createTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { 
            taskTitle,
            taskPriorityId,
            taskCategoryId,
            taskStatus
        } = req.body;

        const result = await Task.createTask({
            priority_id: taskPriorityId,
            category_id: taskCategoryId,
            status: taskStatus,
            title: taskTitle,
            user_id: userId
        });

        res.json({
            success: true,
            message: 'Task created',
            taskId: result.insertId
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Update a task.
 *
 * @param {Object} req.body - Updated task data submitted by the user.
 * @returns {Promise<void>} Sends a JSON response confirming that the task was updated.
 * @throws {Error} Passes errors from task updating to the error-handling middleware.
 */
exports.updateTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.task.task_id;

        const { taskTitle, taskPriorityId, taskCategoryId, taskStatus } = req.body;

        await Task.updateTask(
            taskId,
            {
                priority_id: taskPriorityId,
                category_id: taskCategoryId,
                status: taskStatus,
                title: taskTitle
            },
            userId
        );

        res.json({
            success: true,
            message: 'Task updated',
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a task.
 *
 * @returns {Promise<void>} Sends a JSON response confirming that the task was deleted.
 * @throws {Error} Passes errors from task deletion to the error-handling middleware.
 */
exports.deleteTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.task.task_id;

        await Task.deleteTask(taskId, userId);

        res.json({
            success: true,
            message: 'Task deleted'
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get all tasks for the authenticated user.
 *
 * @returns {Promise<void>} Sends a JSON response containing the user's tasks.
 * @throws {Error} Passes errors from retrieving tasks to the error-handling middleware.
 */
exports.getAllTasks = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const tasks = await Task.getAllTasks(userId);
        if (tasks.length === 0) {
            return res.json({
                success: true,
                tasks: []
            })
        }

        res.json({
            success: true,
            message: 'Tasks found',
            tasks
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get a task by ID.
 *
 * @returns {Promise<void>} Sends a JSON response containing the requested task.
 * @throws {Error} Passes errors to the error-handling middleware.
 */
exports.getTaskById = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: 'Task found',
            task: req.task
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get tasks by category.
 *
 * @param {string} req.params.category - ID of the category.
 * @returns {Promise<void>} Sends a JSON response containing the matching tasks.
 * @throws {Error} Passes errors from retrieving tasks to the error-handling middleware.
 */
exports.getTaskByCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.params.categoryId;

        const tasks = await Task.getTaskByCategory(categoryId, userId);
        if (tasks.length === 0) {
            return res.json({
                success: true,
                tasks: []
            })
        }

        res.json({
            success: true,
            message: 'Task found',
            tasks
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get tasks by status.
 *
 * @param {string} req.params.status - Status used to filter tasks.
 * @returns {Promise<void>} Sends a JSON response containing the matching tasks.
 * @throws {Error} Passes errors from retrieving tasks to the error-handling middleware.
 */
exports.getTaskByStatus = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const status = req.params.status;

        const tasks = await Task.getTaskByStatus(status, userId);
        if (tasks.length === 0) {
            return res.json({
                success: true,
                tasks: []
            })
        }

        res.json({
            success: true,
            message: 'Task found',
            tasks
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get tasks by priority.
 *
 * @param {string} req.params.priorityId - ID of the priority used to filter tasks.
 * @returns {Promise<void>} Sends a JSON response containing the matching tasks.
 * @throws {Error} Passes errors from retrieving tasks to the error-handling middleware.
 */
exports.getTaskByPriority = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const priorityId = req.params.priorityId;

        const tasks = await Task.getTaskByPriority(priorityId, userId);
        if (tasks.length === 0) {
            return res.json({
                success: true,
                tasks: []
            })
        }

        res.json({
            success: true,
            message: 'Task found',
            tasks
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Search for tasks by keyword.
 *
 * @param {string} req.query.keyword - Keyword used to search for tasks.
 * @returns {Promise<void>} Sends a JSON response containing the matching tasks.
 * @throws {Error} Passes errors from searching tasks to the error-handling middleware.
 */
exports.searchTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const keyword = req.query.keyword;

        const tasks = await Task.searchTask(keyword, userId);
        if (tasks.length === 0) {
            return res.json({
                success: true,
                tasks: []
            })
        }

        res.json({
            success: true,
            tasks
        });
    } catch (err) {
        next(err)
    }
}