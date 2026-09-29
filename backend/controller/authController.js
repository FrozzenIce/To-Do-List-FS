const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 *  User Login Handler
 */
exports.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        const results = await User.findByEmailOrUsername(identifier, true);

        if (results.length === 0) {
            const authError = new Error('Invalid credentials');
            authError.status = 401;
            return next(authError);
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const authError = new Error('Invalid Credentials');
            authError.status = 401;
            return next(authError);
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        res.json({
            success: true,
            token,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Change password
 */
exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { currentPassword, newPassword } = req.body;

        const results = await User.findByEmailOrUsername(req.user.username, true);
        if (results.length === 0) return next(new Error('User not found'));
        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            const err = new Error('Current password invalid');
            err.status = 401;
            return next(err);
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        await User.updateUser(userId, {
            password: hashed
        });
        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (e) {
        next(e);
    }
}

/**
 * Create a new user
 */
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existsingUsername = await User.findByEmailOrUsername(username);
        const existingEmail = await User.findByEmailOrUsername(email);

        if (existsingUsername.length > 0) {
            const conflict = new Error('Username already taken');
            conflict.status = 409;
            return next(conflict);
        }

        if (existingEmail.length > 0) {
            const conflict = new Error('Email already taken');
            conflict.status = 409;
            return next(conflict);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.createUser({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: 'User account created successfully',
            userId: result.insertId
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete an user
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const { currentPassword } = req.body;

        const result = await User.findByEmailOrUsername(req.user.username);
        if (result.length === 0) {
            const deletionError = new Error('User not found');
            return next(deletionError);
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            const deletionError = new Error('Current password invalid');
            deletionError.status = 401;
            return next(deletionError);
        }
        await User.deleteUser(userId);
        res.json({
            success: true,
            message: 'User deleted'
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Update user details
 */
exports.editUserDetails = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { username, email, currentPassword } = req.body;

        const existsingUsername = await User.findByEmailOrUsername(username);
        const existsingEmail = await User.findByEmailOrUsername(email);

        const result = await User.findByEmailOrUsername(req.user.username, true);
        if (result.length === 0) {
            const editError = 'User not found';
            return next(editError);
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            const editError = new Error('Current password invalid');
            editError.status = 401;
            return next(editError);
        }

        if (existsingUsername.length > 0 && existsingUsername[0].user_id !== userId) {
            const editError = new Error('Username already taken');
            editError.status = 409;
            return next(editError);
        }

        if (existsingEmail.length > 0 && existsingEmail[0].user_id !== userId) {
            const editError = new Error('Email already taken');
            editError.status = 409;
            return next(editError);
        }

        await User.updateUser(userId, {
            username: username,
            email: email
        });

        res.json({
            success: true,
            message: 'User details updated successfully'
        })
    } catch (err) {
        next(err);
    }
}

/**
 * Get Me
 */
exports.getMe = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        
        const result = await User.findUserById(userId);
        if(result.length === 0) {
            const getError = new Error('User not found');
            getError.status = 404;
            return next(getError);
        }
        res.json({
            success: true,
            user: result[0]
        })
    } catch (err) {
        next (err);
    }
}