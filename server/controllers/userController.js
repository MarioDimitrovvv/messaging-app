const { Router } = require('express');
const { getAllUsers, addUser, getFriends } = require('../services/userServices');

const auth = require('../middlewares/auth');

const router = Router();

router.post('/', auth, async (req, res) => {
    try {
        res.status(200).json({ ...res.locals.user });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: 'Cannot get friends...' });
    }
})

router.get('/:userId/friend/:friendId', (req, res) => {
    console.log(req.params);
})

router.post('/add', async (req, res) => {
    try {
        await addUser(req.body);
        res.status(201);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Cannot add the user...' });
    }
})

router.get('/friends', auth, async (req, res) => {
    try {
        const friends = await getFriends(res.locals.user?._id);
        res.status(201).json(friends);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Cannot add the user...' });
    }
})

module.exports = router;