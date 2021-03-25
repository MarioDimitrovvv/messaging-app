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

module.exports = {
    getAllUsers,
    addUser
}