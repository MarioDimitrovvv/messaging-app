const { Router } = require('express');

const userController = require('./controllers/userController');
const allUsersController = require('./controllers/allUsersController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/api/user', userController);
router.use('/api/users', allUsersController);
router.use('/api/auth', authController);
router.use('*', (req, res) => {
    // deal with this on the front end
    console.log(req.url);
    console.log('404 status');
    res.status(404).json({message: 'Something went wrong!'});
})

module.exports = router;