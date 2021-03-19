const { Router } = require('express');
const { register } = require('../services/authServices');

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.status(200);
});

router.post('/register', (req, res) => {
    register(req.body);
    res.status(200);
});

module.exports = router;