const User = require('../models/User');

const getAllUsers = async (currentUser) => {
    let users = await User.find({}, {name: 1, email: 1});
    users = users.filter(x => x._id != currentUser);

    return users;
}

module.exports = {
    getAllUsers,
}