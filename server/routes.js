const { Router } = require('express');

const authController = require('./controllers/authController');

const router = Router();

router.use('/api/auth/', authController);
router.use('*', (req, res) => {
    res.status(404).json({message: 'Something went wrong!'});
})

module.exports = router;