const otpMap = new Map();

const addOTP = (email, code, expiresAt) => otpMap.set(email, { code, expiresAt });

const verifyOTP = (email, code) => {
  const otpEntry = otpMap.get(email);
  if (!otpEntry) return { valid: false, message: 'No OTP found' };
  if (otpEntry.expiresAt < new Date()) {
    otpMap.delete(email);
    return { valid: false, message: 'OTP expired' };
  }
  if (otpEntry.code !== code) return { valid: false, message: 'Invalid OTP' };
  otpMap.delete(email);
  return { valid: true };
};

module.exports = { addOTP, verifyOTP };
