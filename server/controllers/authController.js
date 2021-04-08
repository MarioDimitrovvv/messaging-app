const { Router } = require('express');
const { register, login } = require('../services/authServices');

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);

        res.status(201).json(token);
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log('error is ' + error.message);

    }
});

router.post('/register', async (req, res) => {

    try {
        const newUser = await register(req.body);
        if(!newUser) return res.json({message: 'Email is already taken!'});
        const token = await login(req.body.email, req.body.password);
        return res.status(200).json(token);
    } catch (err) {
        res.status(400).json({ message: err })
        
    }
});

module.exports = router;