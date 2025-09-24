const express = require('express');
const router = express.Router();
const { getPendingVerifications, verifyPartner } = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');

router.use(protect(['ADMIN']));

router.get('/verifications', getPendingVerifications);
router.put('/verify/:id', verifyPartner);

module.exports = router;
