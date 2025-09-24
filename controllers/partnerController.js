const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// CLIENT requests partner profile
exports.requestPartnerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { service, documents, portfolio } = req.body;

    // Check if request already exists
    const existing = await prisma.partnerProfile.findUnique({ where: { userId } });
    if (existing) return res.status(400).json({ error: 'Partner profile already requested' });

    const profile = await prisma.partnerProfile.create({
      data: {
        userId,
        service,
        documents: JSON.stringify(documents),
        portfolio: JSON.stringify(portfolio),
        status: "PENDING"
      }
    });

    res.json({ message: 'Partner request submitted. Await admin approval.', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PARTNER updates or views profile after approval
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { service, documents, portfolio } = req.body;

    let profile = await prisma.partnerProfile.findUnique({ where: { userId } });
    if (!profile) return res.status(404).json({ error: 'Profile not found. Submit request first.' });

    profile = await prisma.partnerProfile.update({
      where: { userId },
      data: {
        service,
        documents: JSON.stringify(documents),
        portfolio: JSON.stringify(portfolio)
      }
    });

    res.json({ message: 'Profile updated', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await prisma.partnerProfile.findUnique({ where: { userId } });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    profile.documents = JSON.parse(profile.documents);
    profile.portfolio = JSON.parse(profile.portfolio);

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
