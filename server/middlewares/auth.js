const jwt = require('jsonwebtoken');

const { SECRET, COOKIE } = require('../config');

module.exports = (req, res, next) => {
    const token = req.cookies[COOKIE];
    
    if (token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                res.clearCookie(COOKIE);
            } else {
                req.user = decoded;
                res.locals.user = decoded;
            }
        })
    }
    next();
}