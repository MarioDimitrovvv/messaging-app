const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        message: {
            type: 'String',
            require: true,
        }
    }],
})
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;