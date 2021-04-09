const Conversation = require('../models/Conversation');
const User = require('../models/User');

//may need to be moved in another file
// *
const getAllUsers = async (currentUser) => {
    try {
        let users = await User.find({}, { name: 1, email: 1 });
        users = users.filter(x => x._id != currentUser);
        return users;
    } catch (error) {
        return { message: error.message };
    }
}
// * 

const addUser = async ({ currentUser, addingUser }) => {
    const isAlreadyFriend = await User.findOne({ _id: currentUser, friends: addingUser });
    if (isAlreadyFriend) return { message: 'User is already added' };

    await User.findByIdAndUpdate(
        currentUser,
        { $push: { friends: addingUser } }
    )

    await User.findByIdAndUpdate(
        addingUser,
        { $push: { friends: currentUser } }
    )
}

const getFriends = async (id) => {
    try {
        return await User.findById(id, { friends: 1, _id: 0 }).populate('friends', 'name');
    } catch (error) {
        return { message: error.message };
    }
}

const getConversation = async ({ userId, friendId }) => {
    try {
        const conversation = await Conversation.findOne({ users: { $all: [userId, friendId] } });
        return conversation;
    } catch (error) {
        return error.message;
    }
}

const sendMessage = async ({ userId, friendId, message }) => {
    try {
        const conversation = await Conversation.findOne({ users: { $all: [userId, friendId] } });
        if (conversation) {
            conversation.messages.push({ sender: userId, message });
            return conversation.save();
        } else {
            const newConversation = new Conversation({
                users: [userId, friendId],
                messages: [{ sender: userId, message }]
            });
            return newConversation.save();
        }
    } catch (error) {
        return error.message;
    }


}

module.exports = {
    getAllUsers,
    addUser,
    getFriends,
    getConversation,
    sendMessage
}