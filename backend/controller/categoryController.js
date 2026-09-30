const Category = require('../models/Category');

/**
 * Create category
 */
exports.createCategory = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { categoryName } = req.body;

        const existingCategoryName = await Category.getCategoryByName(categoryName, userId);
        if (existingCategoryName.length > 0) {
            const creationError = new Error('Category with name already exsits');
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
 * Get All Categories
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
 * Get Category By Id
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