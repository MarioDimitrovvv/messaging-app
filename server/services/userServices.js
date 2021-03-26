const User = require('../models/User');

const getAllUsers = async (currentUser) => {
    let users = await User.find({}, {name: 1, email: 1});
    users = users.filter(x => x._id != currentUser);

    return users;
}

const addUser = async ({currentUser, addingUser}) => {
    await User.findByIdAndUpdate(
        currentUser,
        {$push: { friends: addingUser}}
    )

    await User.findByIdAndUpdate(
        addingUser,
        {$push: { friends: currentUser}}
    )
}

const getFriends = async (id) => await User.findById(id, {friends: 1, _id: 0}).populate('friends', 'name');

module.exports = {
    getAllUsers,
    addUser,
    getFriends
}