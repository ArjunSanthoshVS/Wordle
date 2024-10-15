const express = require('express');
const { login } = require('../controllers/loginController');
const { userEntry } = require('../middleware/userEntry');
const { signup } = require('../controllers/signupConroller');
const { googleLogin } = require('../controllers/googleLoginController');
const profileRouter = require('../routes/profile/index.js');
const wordRouter = require('../routes/words/index.js');
const router = express.Router();

/* GET home page. */
router.post('/signup', signup)
router.post('/login', login)
router.post('/googleLogin', googleLogin)
router.use('/profile', profileRouter);
router.use('/words', wordRouter);

module.exports = router;
