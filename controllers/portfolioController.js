const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Add portfolio entry
exports.addPortfolio = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const { imageUrl, description } = req.body;

    const profile = await prisma.partnerProfile.findUnique({
      where: { userId: partnerId },
    });

    const portfolio = profile.portfolio ? JSON.parse(profile.portfolio) : [];
    portfolio.push({ imageUrl, description });

    await prisma.partnerProfile.update({
      where: { userId: partnerId },
      data: { portfolio: JSON.stringify(portfolio) },
    });

    res.json({ message: "Portfolio updated", portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const profile = await prisma.partnerProfile.findUnique({
      where: { userId: partnerId },
    });

    const portfolio = profile.portfolio ? JSON.parse(profile.portfolio) : [];
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update portfolio entry at index
exports.updatePortfolio = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const index = parseInt(req.params.index);
    const { imageUrl, description } = req.body;

    const profile = await prisma.partnerProfile.findUnique({ where: { userId: partnerId } });
    const portfolio = profile.portfolio ? JSON.parse(profile.portfolio) : [];

    if (index < 0 || index >= portfolio.length)
      return res.status(400).json({ error: "Invalid index" });

    portfolio[index] = { imageUrl, description };

    await prisma.partnerProfile.update({
      where: { userId: partnerId },
      data: { portfolio: JSON.stringify(portfolio) },
    });

    res.json({ message: "Portfolio updated", portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete portfolio entry
exports.deletePortfolio = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const index = parseInt(req.params.index);

    const profile = await prisma.partnerProfile.findUnique({ where: { userId: partnerId } });
    const portfolio = profile.portfolio ? JSON.parse(profile.portfolio) : [];

    if (index < 0 || index >= portfolio.length)
      return res.status(400).json({ error: "Invalid index" });

    portfolio.splice(index, 1);

    await prisma.partnerProfile.update({
      where: { userId: partnerId },
      data: { portfolio: JSON.stringify(portfolio) },
    });

    res.json({ message: "Portfolio updated", portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
