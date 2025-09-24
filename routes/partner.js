const express = require('express');
const router = express.Router();
const { updateProfile, getProfile, getPartnerLeads } = require('../controllers/partnerController');
const {
  addPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController');
const { protect } = require('../middlewares/auth');

router.use(protect(['PARTNER'])); // only approved partners

router.post('/profile', updateProfile); // edit profile
router.get('/profile', getProfile);     // view profile
router.get('/leads', getPartnerLeads);  // view leads

router.post('/portfolio', addPortfolio);
router.get('/portfolio', getPortfolio);
router.put('/portfolio/:index', updatePortfolio);
router.delete('/portfolio/:index', deletePortfolio);

module.exports = router;
