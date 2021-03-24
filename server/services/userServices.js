const User = require('../models/User');

const getAllUsers = async () => {
    const users = await User.find({}, {name: 1, email: 1});
    return users;
}

module.exports = {
    getAllUsers,
}