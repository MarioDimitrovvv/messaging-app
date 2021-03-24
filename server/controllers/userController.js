const { Router } = require('express');
const { getAllUsers } = require('../services/userServices');

const auth = require('../middlewares/auth');

const router = Router();

router.post('/user', auth, (req, res) => {
    res.status(200).json({ ...res.locals.user });
})

router.post('/all', auth, async (req, res) => {
    const currentUser = res.locals.user?._id;
    try {
        const allUsers = await getAllUsers(currentUser);
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: 'Something went wrong!' });
    }

})


module.exports = router;