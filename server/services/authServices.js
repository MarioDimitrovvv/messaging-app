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
        console.log(salt, hash);
        
        const user = new User({ firstName, secondName, email, password: hash });
        user.save();
    } catch (error) {
        console.log(error);   
    }
}

module.exports = {
    register,
}