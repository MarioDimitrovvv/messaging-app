const jwt = require('jsonwebtoken');

const { SECRET, COOKIE } = require('../config');

module.exports = function() {
    return (req, res, next) => {
        console.log('All cookies ' + req.cookies[COOKIE]);
        const token = req.cookies[COOKIE];
        if(token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if(err) {
                    res.clearCookie(COOKIE);
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            })
        }
        next();
    }
}