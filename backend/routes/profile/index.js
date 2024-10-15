const express = require('express');
const { profileController } = require('../../controllers/profile/profileController');
const router = express.Router();

router.get('/', profileController.getUserProfile);
router.put('/edit-email', profileController.getUserProfile);
router.put('/edit-password', profileController.getUserProfile);
// router.get('/edit-profile', profileController.getUserProfile);



module.exports = router;
