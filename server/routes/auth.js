const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    console.log('PUT /profile hit');
    console.log('Body:', req.body);
    const { name, bio, major } = req.body;

    // Build user object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (major) profileFields.major = major;

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Update
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/auth/save/:id
// @desc    Save or unsave a resource
// @access  Private
router.put('/save/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const resourceId = req.params.id;

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Initialize if undefined
        if (!user.savedResources) {
            user.savedResources = [];
        }

        // Mongoose array of ObjectIds. Compare as strings.
        const isSaved = user.savedResources.some(id => id.toString() === resourceId);

        if (isSaved) {
            // Unsave
            console.log(`Unsaving resource ${resourceId} for user ${req.user.id}`);
            user.savedResources = user.savedResources.filter(id => id.toString() !== resourceId);
        } else {
            // Save
            console.log(`Saving resource ${resourceId} for user ${req.user.id}`);
            // Check duplicates just in case (though logic above handles toggle)
            if (!user.savedResources.some(id => id.toString() === resourceId)) {
                user.savedResources.push(resourceId);
            }
        }

        await user.save();
        console.log('Updated savedResources:', user.savedResources);
        res.json(user.savedResources);
    } catch (err) {
        console.error('Error in PUT /save:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;
