const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Discussion = require('../models/Discussion');
const User = require('../models/User');

// @route   POST api/discussions
// @desc    Create a discussion/question
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const newDiscussion = new Discussion({
            title,
            content,
            tags,
            author: req.user.id
        });

        const discussion = await newDiscussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/discussions
// @desc    Get all discussions
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('author', ['name', 'profilePicture']) // Populate question author
            .populate('answers.author', ['name', 'profilePicture']) // Populate answer authors
            .sort({ createdAt: -1 });
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/discussions/:id
// @desc    Get discussion by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id)
            .populate('author', ['name', 'profilePicture'])
            .populate('answers.author', ['name', 'profilePicture']);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   POST api/discussions/answer/:id
// @desc    Add answer to a discussion
// @access  Private
router.post('/answer/:id', auth, async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const newAnswer = {
            text: req.body.text,
            author: req.user.id,
            name: user.name,
            profilePicture: user.profilePicture
        };

        discussion.answers.unshift(newAnswer);

        await discussion.save();

        res.json(discussion.answers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
