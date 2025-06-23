const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema(
    {
    milestoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    tip: {
        type: String,
        required: true,
        maxLength: 500
    },

    likes: {
        type: Number,
        default: 0
    },

    upvoteBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;