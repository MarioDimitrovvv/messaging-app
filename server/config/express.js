const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');

const whitelist = ['http://localhost:3000', 'http://192.168.0.20:3000']

module.exports = (app) => {

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());

    app.use(cors({
        // add domain origin
        // origin: ['http://localhost:3000', 'http://192.168.0.20:3000'],
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
    }));

    app.use(cookieParser());
}