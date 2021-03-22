const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');

const User = require('../models/User');

async function register({ firstName, secondName, email, password, repeatPassword }) {
    if (password !== repeatPassword) {
        console.log(password, repeatPassword);
        //notification msg!!!
        return;
    }
    try {
        
        let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
        let hash = await bcrypt.hash(password, salt);
        
        const user = new User({ firstName, secondName, name: `${firstName} ${secondName}`, email, password: hash });

        const newUser = await user.save();
        console.log(newUser);
    } catch (error) {
        console.log('Error from registration ' + error);   
    }
}

async function login(email, password) {
    let user = await User.findOne({ email });
    if (!user) throw { message: 'User not found!' };
    console.log(user);
    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw { message: 'Incorrect Password!' };

    let token = jwt.sign({ _id: user._id, email }, config.SECRET);

    return token;
}

module.exports = {
    register,
    login
}