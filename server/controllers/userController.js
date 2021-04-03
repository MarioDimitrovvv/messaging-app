const { Router } = require('express');
const { addUser, getFriends, getConversation, sendMessage } = require('../services/userServices');

const auth = require('../middlewares/auth');
 
const router = Router(); 

router.post('/', auth, async (req, res) => {
    console.log('try to connect');
    try {
        res.status(200).json({ ...res.locals.user });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: 'Cannot get friends...' });
    }
})

router.get('/:userId/friend/:friendId', async (req, res) => {
    try {
        const conversation = await getConversation(req.params);
        conversation ? res.status(200).json(conversation.messages) : res.status(204).json({message: 'No conversation'});
    } catch (error) {
        console.log(error);        
    }
})

router.post('/:userId/friend/:friendId', async (req, res) => {
    const newMessage = await sendMessage({...req.params, ...req.body});
    res.status(201); 
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