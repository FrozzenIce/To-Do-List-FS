const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const taskMiddleware = require('../middleware/taskMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const taskController = require('../controller/taskController');

router.post('/', authMiddleware, validationMiddleware.validateTaskCreate, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);

router.get('/category/:categoryId', authMiddleware, taskController.getTaskByCategory);
router.get('/priority/:priorityId', authMiddleware, taskController.getTaskByPriority);
router.get('/status/:status', authMiddleware, taskController.getTaskByStatus);
router.get('/search', authMiddleware, taskController.searchTask);

router.get('/:taskId', authMiddleware, taskMiddleware, taskController.getTaskById);
router.put('/:taskId', authMiddleware, validationMiddleware.validateTaskUpdate, taskMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskMiddleware, taskController.deleteTask);

module.exports = router;