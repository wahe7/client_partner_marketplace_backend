const express = require('express');
const router = express.Router();
const { requestPartnerProfile } = require('../controllers/partnerController');
const { protect } = require('../middlewares/auth');

router.use(protect(['CLIENT'])); // only clients can request

router.post('/request', requestPartnerProfile);

module.exports = router;
