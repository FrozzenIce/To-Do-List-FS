const Priority = require('../models/Priority');

module.exports = async (req, res, next) => {
    try {
        const priorityId = req.params.priorityId;

        const priority = await Priority.getPriorityById(priorityId);
        if (priority.length === 0) {
            const error = new Error('Priority not found');
            error.status = 404;
            return next(error);
        }

        req.priority = priority[0];
        next();
    } catch (err) {
        return next(err);
    }
}