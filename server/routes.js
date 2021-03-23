const { Router } = require('express');

const authController = require('./controllers/authController');
const auth = require('./middlewares/auth');

const router = Router();

router.post('/api/user', auth, (req, res) => {
    res.status(200).json({...res.locals.user});
})
router.use('/api/auth', authController);
router.use('*', (req, res) => {
    console.log('404 status');
    res.status(404).json({message: 'Something went wrong!'});
})

module.exports = router;