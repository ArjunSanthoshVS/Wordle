const express = require('express');
const { wordController } = require('../../controllers/word/wordController');
const router = express.Router();

router.post('/create-word', wordController.createAWord);
router.put('/edit-word', );



module.exports = router;