const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resource = require('../models/Resource');
const User = require('../models/User');

const upload = require('../middleware/upload');
const multer = require('multer');
const uploadPdfToCloudinary = require('../utils/cloudinary');

// @route   POST api/resources
// @desc    Create a resource
// @access  Private
router.post('/', [auth, upload.single('file')], async (req, res) => {
    try {
        const { title, description, subject } = req.body;

        if (!title || !description) {
            return res.status(400).json({ msg: 'Title and description are required' });
        }

        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload a PDF file' });
        }

        // Upload PDF to Cloudinary
        const result = await uploadPdfToCloudinary(req.file.buffer,req.file.originalname);

        const newResource = new Resource({
            title,
            description,
            subject,
            fileUrl: result.secure_url,
            originalFileName: req.file.originalname,
            createdBy: req.user.id
        });

        const resource = await newResource.save();
        res.json(resource);

    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET api/resources
// @desc    Get all resources
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const resources = await Resource.find()
            .populate('createdBy', ['name', 'profilePicture'])
            .sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/resources/like/:id
// @desc    Like a resource
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }

        // Check if the resource has already been liked
        if (resource.likes.includes(req.user.id)) {
            // Unlike
            const removeIndex = resource.likes.indexOf(req.user.id);
            resource.likes.splice(removeIndex, 1);
        } else {
            // Like
            resource.likes.push(req.user.id);
        }

        await resource.save();
        res.json(resource.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route   GET api/resources/saved
// @desc    Get saved resources for logged in user
// @access  Private
router.get('/saved', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.savedResources) {
            user.savedResources = [];
        }

        console.log(`[DEBUG] RAW Saved Resources for ${req.user.id}:`, user.savedResources);

        // If empty, return empty array immediately
        if (user.savedResources.length === 0) {
            return res.json([]);
        }

        // Populate details
        await user.populate({
            path: 'savedResources',
            populate: { path: 'createdBy', select: 'name profilePicture' }
        });

        console.log('Sending saved resources:', user.savedResources);
        res.json(user.savedResources);
    } catch (err) {
        console.error('Error in GET /saved:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});



module.exports = router;
