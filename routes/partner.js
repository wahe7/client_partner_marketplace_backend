const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/partnerController');
const { protect } = require('../middlewares/auth');

router.use(protect(['PARTNER'])); // only approved partners

router.post('/profile', updateProfile); // edit profile
router.get('/profile', getProfile);     // view profile

module.exports = router;
