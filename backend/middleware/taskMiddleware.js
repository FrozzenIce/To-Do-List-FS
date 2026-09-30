const Task = require('../models/Task');

module.exports = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const taskId = req.params.taskId;

        const task = await Task.getTaskById(taskId, userId);
        if (task.length === 0) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        req.task = task[0];
        next();
    } catch (err) {
        return next(err);
    }
}