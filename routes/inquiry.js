const express = require('express');
const router = express.Router();
const { createInquiry, getClientInquiries } = require('../controllers/inquiryController');
const { protect } = require('../middlewares/auth');

router.use(protect(['CLIENT']));

router.post('/', createInquiry);
router.get('/', getClientInquiries);

module.exports = router;
