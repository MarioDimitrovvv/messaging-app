const { Router, response } = require('express');
const { register, login } = require('../services/authServices');
const { COOKIE } = require('../config');

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);

        res.status(201).json(token);
    } catch (error) {
        //send notification msg
        res.status(200).json({ message: error.message })
        console.log('error is ' + error.message);
        console.log('in the catch blog');

    }
});

router.post('/register', async (req, res) => {

    try {
        await register(req.body)
        const token = await login(req.body.email, req.body.password)
        return res.status(200).json(token)
        
    } catch (err) {
        //send notification msg
        console.log('Error is ' + err.message);
        res.status(200).json({ message: err })
        
    }
});

module.exports = router;