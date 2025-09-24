const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getPendingVerifications = async (req, res) => {
  try {
    const partners = await prisma.partnerProfile.findMany({
      where: { status: "PENDING" },
      include: { user: true }
    });
    res.json(partners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // VERIFIED or REJECTED

    if (!["VERIFIED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const profile = await prisma.partnerProfile.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    if (status === "VERIFIED") {
      // Update user role to PARTNER
      await prisma.user.update({
        where: { id: profile.userId },
        data: { role: "PARTNER" }
      });
    }

    res.json({ message: `Partner ${status.toLowerCase()}`, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
