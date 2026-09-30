const Priority = require('../models/Priority');

/**
 * Get all priorities.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for passing errors to the error handler.
 * @returns {Promise<void>} Sends a JSON response containing all priorities.
 * @throws {Error} Passes any error that occurs while retrieving priorities to the error-handling middleware.
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
 * Get a priority by ID.
 *
 * @param {Object} req - Express request object containing the priority attached by middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware callback used to pass errors to the error handler.
 * @returns {Promise<void>} Sends a JSON response containing the requested priority.
 * @throws {Error} Passes any error that occurs while retrieving the priority to the error-handling middleware.
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