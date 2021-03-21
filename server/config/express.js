const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const cookieAllower = require('../middlewares/cookieAllower');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    
    app.use(express.urlencoded({ extended: true }));
    
    app.use(express.json());
    
    app.use(cors({
        origin: '*',
        credentials: true,
    }));
    
    app.use(cookieParser());
    
    app.use(auth());
} 