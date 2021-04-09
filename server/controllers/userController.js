const { Router } = require('express');
const { addUser, getFriends, getConversation, sendMessage } = require('../services/userServices');

const auth = require('../middlewares/auth');
 
const router = Router(); 

router.post('/', auth, async (req, res) => {
    try {
        res.status(200).json({ ...res.locals.user });
    } catch (error) {
        res.json({ message: 'Cannot set your cookie...' });
    }
})

router.get('/:userId/friend/:friendId', async (req, res) => {
    try {
        const conversation = await getConversation(req.params);
        conversation ? res.status(200).json(conversation.messages) : res.status(204).json({message: 'No conversation'});
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.post('/:userId/friend/:friendId', async (req, res) => {
    try {
        const newMessage = await sendMessage({...req.params, ...req.body});
        newMessage?.message ? res.json({message: newMessage.message}) : res.status(201);
    } catch (error) {
        res.json({message: 'Cannot send this message'});        
    }
})

router.post('/add', async (req, res) => {
    try {
        const addedUser = await addUser(req.body);
        addedUser?.message ? res.json({message: addedUser.message}) : res.status(201);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/friends', auth, async (req, res) => {
    try {
        const friends = await getFriends(res.locals.user?._id);
        friends?.message ? res.json({message: friends.message}) : res.status(201).json(friends);
        
    } catch (error) {
        console.log(error.message);
        res.json({ message: 'Cannot get your friends...' });
    }
})

module.exports = router;