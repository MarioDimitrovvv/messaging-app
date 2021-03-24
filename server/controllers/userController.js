const { Router } = require('express');
const { getAllUsers } = require('../services/userServices');

const auth = require('../middlewares/auth');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json({users: allUsers});
    } catch (error) {
        res.status(404).json({message: 'Something went wrong!'});
    }
     
})

router.post('/user', auth, (req, res) => {
    res.status(200).json({...res.locals.user});
})

module.exports = router;