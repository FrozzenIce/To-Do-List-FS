const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const categoryMiddleware = require('../middleware/categoryMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const categoryController = require('../controller/categoryController');

router.post('/', authMiddleware, validationMiddleware.validateCategoryCreate, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getAllCategories);
router.get('/:categoryId', authMiddleware, categoryMiddleware, categoryController.getCategoryById);
router.put('/:categoryId', authMiddleware, categoryMiddleware, validationMiddleware.validateCategoryUpdate, categoryController.updateCategory);
router.delete('/:categoryId', authMiddleware, categoryMiddleware, categoryController.deleteCategory);

module.exports = router;