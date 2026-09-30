const Task = require('../models/Task');

/**
 * Create Task
 */
exports.createTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { taskTitle, taskPriorityId, taskCategoryId, taskStatus } = req.body;

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
 * Update task
 */
exports.updateTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.task.task_id;

        const { taskTitle, taskPriorityId, taskCategoryId, taskStatus } = req.body;
        const result = await Task.getTaskById(taskId, userId);
        if (result.length === 0) {
            const updateError = new Error('Task not found');
            updateError.status = 404;
            return next(updateError);
        }

        await Task.updateTask(
            taskId,
            {
                priority_id: taskPriorityId,
                category_id: taskCategoryId,
                status: taskStatus,
                title: taskTitle
            }
            , userId
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
 * Delete task
 */
exports.deleteTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.task.task_id;

        const result = await Task.getTaskById(taskId, userId);
        if (result.length === 0) {
            const deletionError = new Error('Task not found');
            deletionError.status = 404;
            return next(deletionError);
        }

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
 * Get All Tasks
 */
exports.getAllTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const tasks = await Task.getAllTask(userId);
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
 * Get Task by Id
 */
exports.getTaskById = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.task.task_id;

        const task = await Task.getTaskById(taskId, userId);
        if (task.length === 0) {
            const getError = new Error('Task not found');
            getError.status = 404;
            return next(getError);
        }

        res.json({
            success: true,
            message: 'Task found',
            task: task[0]
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get Task by Category
 */
exports.getTaskByCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.task.category_id;

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
 * Get Task by Status 
 */
exports.getTaskByStatus = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const status = req.task.status;

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
 * Get Task by Priority
 */
exports.getTaskByPriority = async (req, res, next) => {
        try {
        const userId = req.user.user_id;
        const priorityId = req.task.priority_id;

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
 * 
 */
exports.searchTask = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const keyword = req.body;

        const tasks = await Task.searchTask(keyword, userId);
        if(tasks.length === 0) {
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