// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// OTP expiration time in minutes
const expireTime = 5;

module.exports = {
  generateOTP,
  expireTime
};
