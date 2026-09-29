const User = require('../models/User');
const bcrypt = require('bcrypt.js');
const jwt = requrie('jsonwebtoken');

/**
 *  User Login Handler
 */
exports.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        const results = await User.findByEmailOrUsername(identifier);

        if(results.length === 0) {
            const authError = new Error('Invalid credentials');
            authError.status = 401;
            return next(authError);
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
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
                expiresIn: 'id',
            }
        );

        res.json({
            success: true,
            token,
        });
    } catch(err) {
        next (err);
    }
};

/**
 * Change password
 */
exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { currentPassword, newPassword } = req.body;

        const results = await User.findByEmailOrUsername(req.user.username);
        if (results.length === 0) return next(new Error('User not found'));
        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) {
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

        if(existsingUsername.length > 0) {
            const conflict = new Error('Username already taken');
            conflict.status = 409;
            return next(conflict);
        }

        if(existingEmail.length > 0) {
            const conflict = new Error('Email already taken');
            conflict.status = 409;
            return next(conflict);
        }

        const hashedPassword = await bcrypt.has(password, 10);
        const result = await User.createUser(username, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: 'User account created successfully',
            userId: result.insertID
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

        const result = await User.findUserByEmailorUsername(req.user.username);
        if(result.length === 0) {
            const deletionError = 'User not found';
            return next(deletionError);
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) {
            const deletionError = 'Current password invalid';
            deletionError.status =  401;
            return next(deletionError);
        }
        await User.deleteUser(userId);
        res.json({
            success: true,
            message: 'User deleted'
        });
    } catch (err) {
        next (err);
    }
}