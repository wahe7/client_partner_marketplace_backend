
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.createInquiry = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { category, date, budget, city, referenceImage } = req.body;

    const partners = await prisma.partnerProfile.findMany({
      where: {
        status: "VERIFIED",
        city: city,
        tags: { has: category }
      }
    });

    const assignedPartners = partners.map(p => p.userId);

    const inquiry = await prisma.inquiry.create({
      data: {
        clientId,
        category,
        date: new Date(date),
        budget,
        city,
        referenceImage,
        assignedPartners
      }
    });

    res.json({ message: "Inquiry created and assigned to partners", inquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getClientInquiries = async (req, res) => {
  try {
    const clientId = req.user.id;
    const inquiries = await prisma.inquiry.findMany({
      where: { clientId }
    });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
