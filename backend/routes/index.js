const express = require('express');
const { login } = require('../controllers/loginController');
const { userEntry } = require('../middleware/userEntry');
const { signup } = require('../controllers/signupConroller');
const { googleLogin } = require('../controllers/googleLoginController');
const router = express.Router();

/* GET home page. */
router.post('/signup', signup)
router.post('/login', login)
router.post('/googleLogin', googleLogin)

module.exports = router;
