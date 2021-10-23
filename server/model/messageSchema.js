const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    }},
    {
        timestamps: true
    }
)

const Messages = mongoose.model('MESSAGES', messagesSchema);

module.exports = Messages;