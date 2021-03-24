const { Router } = require('express');

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const router = Router();

router.use('/api/users', userController);
router.use('/api/auth', authController);
router.use('*', (req, res) => {
    console.log('404 status');
    res.status(404).json({message: 'Something went wrong!'});
})

module.exports = router;