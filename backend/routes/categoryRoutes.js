const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const categoryMiddleware = require('../middleware/categoryMiddleware');
const categoryController = require('../controller/categoryController');

router.get('/', authMiddleware, categoryMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryMiddleware, categoryController.getAllCategories);
router.get('/:categoryId', authMiddleware, categoryMiddleware, categoryController.getCategoryById);
router.put('/:categoryId', authMiddleware, categoryMiddleware, categoryController.updateCategory);
router.delete('/:categoryId', authMiddleware, categoryMiddleware, categoryController.deleteCategory);

module.exports = router;