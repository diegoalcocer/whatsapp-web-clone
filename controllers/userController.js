const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            phoneNumber: req.body.phoneNumber,
            userName: req.body.userName,
            hashedPassword: hashedPassword,
            profileInfo: req.body.profileInfo,
            lastSeen: req.body.lastSeen
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

// Get user details
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        // Retrieve user from database
        const user = await User.findOne({ username: req.body.userName });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Compare submitted password with hashed password in database
        const isValidPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Create and send JWT
        const token = jwt.sign(
            { userId: user._id, username: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Authentication successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};