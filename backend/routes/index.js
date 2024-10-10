const express = require('express');
const { login } = require('../controllers/loginController');
const { userEntry } = require('../middleware/userEntry');
const router = express.Router();

/* GET home page. */
router.get('/login', userEntry, login)

module.exports = router;
