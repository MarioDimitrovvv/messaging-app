const Conversation = require('../models/Conversation');
const User = require('../models/User');

//may need to be moved in another file
// *
const getAllUsers = async (currentUser) => {
    let users = await User.find({}, { name: 1, email: 1 });
    users = users.filter(x => x._id != currentUser);

    return users;
}
// * 

const addUser = async ({ currentUser, addingUser }) => {
    await User.findByIdAndUpdate(
        currentUser,
        { $push: { friends: addingUser } }
    )

    await User.findByIdAndUpdate(
        addingUser,
        { $push: { friends: currentUser } }
    )
}

const getFriends = async (id) => await User.findById(id, { friends: 1, _id: 0 }).populate('friends', 'name');

const getConversation = async ({ userId, friendId }) => {
    console.log(userId, friendId);
    try {
        const conversation = await Conversation.findOne({ users: { $all: [userId, friendId] } });
        return conversation;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const sendMessage = async ({ userId, friendId, message }) => {
    console.log(userId, friendId, message);
    try {
        const conversation = await Conversation.findOneAndUpdate({ users: [userId, friendId] });
        if (conversation) {
            conversation.messages.push({ sender: userId, message });
            conversation.save();
        } else {
            const newConversation = new Conversation({
                users: [userId, friendId],
                messages: [{ sender: userId, message }]
            });
            newConversation.save();
        }
    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    getAllUsers,
    addUser,
    getFriends,
    getConversation,
    sendMessage
}