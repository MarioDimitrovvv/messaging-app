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
        
    } catch (error) {
        console.log('Error from registration ' + error);   
    }
}

async function login(email, password) {
    let user = await User.findOne({ email });
    if (!user) return { message: 'User not found!' };

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return { message: 'Incorrect Password!' };
    
    let token = jwt.sign({ _id: user._id, email, name: user.name }, config.SECRET);

    return token;
}

module.exports = {
    register,
    login
}