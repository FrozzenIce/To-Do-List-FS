const Category = require('../models/Category');

/**
 * Create category
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response after creating the category.
 * @throws {Error} Passes any unexpected error to the error-handling middleware.
 */
exports.createCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { categoryName } = req.body;

        const existingCategoryName = await Category.getCategoryByName(categoryName, userId);
        if (existingCategoryName.length > 0) {
            const creationError = new Error('Category with name already exists');
            creationError.status = 409;
            return next(creationError);
        }

        const result = await Category.createCategory(categoryName, userId);

        res.json({
            success: true,
            message: 'Category created',
            categoryId: result.insertId
        });
    } catch (err) {
        next(err);
    }

}

/**
 * Delete category
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response after deleting the category.
 * @throws {Error} Passes any unexpected error to the error-handling middleware.
 */
exports.deleteCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.category.category_id;

        await Category.deleteCategory(categoryId, userId);

        res.json({
            success: true,
            message: 'Category deleted'
        })
    } catch (err) {
        next(err);
    }
}

/**
 * Update category
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response after updating the category.
 * @throws {Error} Passes any unexpected error to the error-handling middleware.
 */
exports.updateCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.category.category_id;
        const { categoryName } = req.body;

        const existingCategoryName = await Category.getCategoryByName(categoryName, userId);
        if (existingCategoryName.length > 0 && existingCategoryName[0].category_id !== categoryId) {
            const updateError = new Error('Category with name already exists');
            updateError.status = 409;
            return next(updateError);
        }

        await Category.updateCategory(categoryId, userId, categoryName);

        res.json({
            success: true,
            message: 'Category updated'
        });
    } catch (err) {
        next(err)
    }
}

/**
 * Get all categories
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response containing all categories.
 * @throws {Error} Passes any unexpected error to the error-handling middleware.
 */

exports.getAllCategories = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const categories = await Category.getAllCategories(userId);

        res.json({
            success: true,
            categories
        })

    } catch (err) {
        next(err)
    }
}

/**
 * Get category by ID
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response containing the category.
 * @throws {Error} Passes any unexpected error to the error-handling middleware.
 */
exports.getCategoryById = async (req, res, next) => {
    try {
        res.json({
            success: true,
            category: req.category
        })

    } catch (err) {
        next(err)
    }
}