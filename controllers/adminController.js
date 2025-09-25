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

exports.getKPIs = async (req, res) => {
  try {
    const totalClients = await prisma.user.count({ where: { role: "CLIENT" } });
    const totalPartners = await prisma.user.count({ where: { role: "PARTNER" } });
    const pendingVerifications = await prisma.partnerProfile.count({ where: { status: "PENDING" } });
    const totalInquiries = await prisma.inquiry.count();

    res.json({ totalClients, totalPartners, pendingVerifications, totalInquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// --- 2️⃣ Reviews CRUD ---
exports.getReviews = async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
};

exports.editReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await prisma.review.update({
    where: { id: parseInt(id) },
    data: { rating, comment },
  });
  res.json({ message: "Review updated", review });
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  await prisma.review.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Review deleted" });
};

// --- 3️⃣ Category CRUD ---
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  res.json({ message: "Category created", category });
};

exports.getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await prisma.category.update({ where: { id: parseInt(id) }, data: { name } });
  res.json({ message: "Category updated", category });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await prisma.category.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Category deleted" });
};

// --- 4️⃣ Location CRUD ---
exports.createLocation = async (req, res) => {
  const { name } = req.body;
  const location = await prisma.location.create({ data: { name } });
  res.json({ message: "Location created", location });
};

exports.getLocations = async (req, res) => {
  const locations = await prisma.location.findMany();
  res.json(locations);
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const location = await prisma.location.update({ where: { id: parseInt(id) }, data: { name } });
  res.json({ message: "Location updated", location });
};

exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  await prisma.location.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Location deleted" });
};
