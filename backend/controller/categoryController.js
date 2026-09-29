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
        const category = result[0];

        res.json({
            success: true,
            message: 'Category created',
            categoryId: category.insertId
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

        const result = await Category.getCategoryById(categoryId, userId);
        if (result.length === 0) {
            const deletionError = new Error('Category not found');
            deletionError.status = 404;
            return next(deletionError);
        }

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

        const result = await Category.getCategoryById(categoryId, userId);
        if (result.length === 0) {
            const updateError = new Error('Category not found');
            updateError.status = 404;
            return next(updateError);
        }

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

        const results = await Category.getAllCategories(userId);
        if(results.length === 0) {
            const getError = new Error('Categories not found');
            getError.status = 404;
            return next(getError);
        }

        res.json({
            success: true,
            results
        })

    } catch (err) {
        next (err)
    }
}

/**
 * Get Category By Id
 */
exports.getCategoryById = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.category.category_id;

        const result = await Category.getCategoryById(categoryId, userId);
        if(result.length === 0) {
            const getError = new Error('Category not found');
            getError.status = 404;
            return next(getError);
        }

        res.json({
            success: true,
            category: result[0]
        })

    } catch (err) {
        next (err)
    }
}