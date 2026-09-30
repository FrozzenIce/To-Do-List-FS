const Category = require('../models/Category');

/**
 * 
 */
module.exports = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const categoryId = req.params.categoryId;

        const category = await Category.getCategoryById(categoryId, userId);
        if (category.length === 0) {
            const error = new Error('Category not found')
            error.status = 404;
            return next(err);
        }

        req.category = category[0];
        next();
    } catch (err) {
        return next(err);
    }
}