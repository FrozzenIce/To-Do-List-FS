const express = require('express');
const router = express.Router();

const priorityMiddleware = require('../middleware/priorityMiddleware');
const priorityController = require('../controller/priorityController');

router.get('/', priorityController.getAllPriorities);
router.get('/:priorityId', priorityMiddleware, priorityController.getPriorityById);

module.exports = router;