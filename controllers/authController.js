const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateOTP, expireTime } = require('../utils/otp');
const { addOTP, verifyOTP: verifyOTPStore } = require('../utils/otpStore');

// Generate and send OTP
const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + expireTime * 60 * 1000);
    
    // In a real app, you would send this OTP via email/SMS
    console.log(`OTP for ${email}: ${otp} (expires in ${expireTime} minutes)`);
    
    // Store OTP in memory
    addOTP(email, otp, expiresAt);
    
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const result = verifyOTPStore(email, otp);
  
  if (!result.valid) {
    return res.status(400).json({ error: result.message });
  }
  
  // In a real app, you would create/update the user here
  res.json({ message: 'OTP verified successfully' });
};

// User signup
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.status(201).json("User created successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  sendOTP,
  verifyOTP
};
