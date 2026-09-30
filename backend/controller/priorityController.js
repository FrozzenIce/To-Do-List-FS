const Priority = require('../models/Priority')

/**
 * Get all priorties
 */
exports.getAllPriorities = async (req, res, next) => {
    try {
        const priorities = await Priority.getAllPriorities();

        res.json({
            success: true,
            priorities
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get Category by Id
 */
exports.getPriorityById = async (req, res, next) => {
    try {
        res.json({
            success: true,
            priority: req.priority
        });
    } catch (err) {
        next(err);
    }
}