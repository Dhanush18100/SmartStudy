const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    answers: [{
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        upvotes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
