const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

212

const addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            username,
            password: hashedPassword,
            email
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            res.status(400).json({ message: `${field} already exists` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }, '-password');

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const updates = { ...req.body };
        
        // Hash password if it's being updated
        if (updates.password) {
            const salt = await bcrypt.genSalt();
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findOneAndUpdate(
            { username },
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const userPayload = {
                id: user._id,
                username: user.username,
                email: user.email
            };

            const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET);
            return res.json({ success: true, accessToken, user: username });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getUsers, 
    addUser, 
    getUser, 
    updateUser, 
    deleteUser,
    login
};