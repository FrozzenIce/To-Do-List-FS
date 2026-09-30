// USER VALIDATIONS

const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username, email and password are required'
        });
    }

    if (typeof username !== 'string' || username.trim().length < 3) {
        return res.status(400).json({
            success: true,
            message: 'Username must be at least 3 characters long'
        });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address'
        });
    }

    if (typeof password !== 'string' || password.trim().length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least more than 6 characters long'
        });
    }
    next();
};

const validateUserUpdate = (req, res, next) => {
    const { username, email, password } = req.body;

    if (username === undefined && email === undefined && password === undefined) {
        return res.status(400).json({
            success: false,
            message: 'At least one field is required'
        });
    }

    if (username !== undefined) {
        if (typeof username !== 'string' || username.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Username must be at least 3 characters long'
            });
        }
    }

    if (email !== undefined) {
        if (typeof email !== 'string' || email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }
    }

    if (password !== undefined) {
        if (typeof password !== 'string' || password.trim().length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            })
        }
    }

    next();
};

const validatePasswordChange = (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Old password and new password are required'
        })
    }

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Password must be strings'
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'New password must be at least 6 characters long'
        });
    }

    next();
}

// CATEGORY VALIDATIONS

const validateCategoryCreate = (req, res, next) => {
    const { categoryName } = req.body;

    if(!categoryName) { 
        return res.status(400).json({
            success: false,
            message: 'Category name is required'
        });
    }

    if(typeof categoryName !== 'string' || categoryName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            message: 'Category name must be a valid string'
        });
    }

    next();
}

const validateCategoryUpdate = (req, res, next) => {
    const { categoryName } = req.body;
    
    if(!categoryName) { 
        return res.status(400).json({
            success: false,
            message: 'Category name is required'
        });
    }

    if(typeof categoryName !== 'string' || categoryName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            message: 'Category name must be a valid string'
        });
    }

    next();
}

// TASK VALIDATIONS

const validateTaskCreate = (req, res, next) => {
    const {
        taskTitle,
        taskPriorityId,
        taskCategoryId,
        taskStatus
    } = req.body;

    if (
        taskTitle === undefined ||
        taskTitle === null ||
        taskTitle.trim() === ''
    ) {
        return res.status(400).json({
            success: false,
            message: 'Task title is required'
        });
    }

    if (typeof taskTitle !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Task title must be a string'
        });
    }

    if (taskPriorityId !== undefined &&
        (!Number.isInteger(Number(taskPriorityId)) || Number(taskPriorityId) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Priority ID must be a valid number'
        });
    }

    if (taskCategoryId !== undefined &&
        (!Number.isInteger(Number(taskCategoryId)) || Number(taskCategoryId) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Category ID must be a valid number'
        });
    }

    if (taskStatus !== undefined &&
        ![0, 1, 2].includes(Number(taskStatus))) {
        return res.status(400).json({
            success: false,
            message: 'Status must be 0, 1 or 2'
        });
    }

    // Defaults
    req.body.taskPriorityId = taskPriorityId ?? 1;
    req.body.taskCategoryId = taskCategoryId ?? 1;
    req.body.taskStatus = taskStatus ?? 0;

    next();
};

const validateTaskUpdate = (req, res, next) => {
    const {
        taskTitle,
        taskPriorityId,
        taskCategoryId,
        taskStatus
    } = req.body;

    if (
        taskTitle === undefined &&
        taskPriorityId === undefined &&
        taskCategoryId === undefined &&
        taskStatus === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: 'At least one field is required'
        });
    }

    if (taskTitle !== undefined) {
        if (
            typeof taskTitle !== 'string' ||
            taskTitle.trim() === ''
        ) {
            return res.status(400).json({
                success: false,
                message: 'Task title must be a valid string'
            });
        }
    }

    if (taskPriorityId !== undefined) {
        if (
            !Number.isInteger(Number(taskPriorityId)) ||
            Number(taskPriorityId) < 1
        ) {
            return res.status(400).json({
                success: false,
                message: 'Priority ID must be a valid number'
            });
        }
    }

    if (taskCategoryId !== undefined) {
        if (
            !Number.isInteger(Number(taskCategoryId)) ||
            Number(taskCategoryId) < 1
        ) {
            return res.status(400).json({
                success: false,
                message: 'Category ID must be a valid number'
            });
        }
    }

    if (taskStatus !== undefined) {
        if (![0, 1, 2].includes(Number(taskStatus))) {
            return res.status(400).json({
                success: false,
                message: 'Status must be 0, 1 or 2'
            });
        }
    }

    next();
};

module.exports = {
    validateRegister,
    validateUserUpdate,
    validatePasswordChange,
    validateCategoryCreate,
    validateCategoryUpdate,
    validateTaskCreate,
    validateTaskUpdate
};