const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    major: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '', // URL to image
    },
    savedResources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
