const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    message: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const Conversation = mongoose.model('CONVERSATION', conversationSchema);

module.exports = Conversation;